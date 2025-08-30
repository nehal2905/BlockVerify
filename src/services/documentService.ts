import { supabase, generateBlockchainHash } from '../lib/supabase';
import { Document } from '../types';

export class DocumentService {
  static async uploadDocument(
    file: File, 
    title: string, 
    type: string, 
    tags: string[] = []
  ): Promise<Document> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Generate blockchain hash
    const blockchainHash = generateBlockchainHash(file);
    
    // Upload file to storage
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Create document record
    const { data: document, error: docError } = await supabase
      .from('documents')
      .insert({
        title,
        type,
        file_path: uploadData.path,
        file_size: file.size,
        blockchain_hash: blockchainHash,
        tags,
        uploaded_by: user.id
      })
      .select(`
        *,
        uploaded_by_profile:profiles!uploaded_by(name),
        verified_by_profile:profiles!verified_by(name)
      `)
      .single();

    if (docError) throw docError;

    // Create initial verification steps
    const verificationSteps = [
      'Document Hash Generation',
      'Blockchain Validation',
      'Authority Verification',
      'Final Approval'
    ];

    await supabase
      .from('verification_steps')
      .insert(
        verificationSteps.map((stepName, index) => ({
          document_id: document.id,
          step_name: stepName,
          completed: index === 0, // First step completed immediately
          completed_at: index === 0 ? new Date().toISOString() : null
        }))
      );

    return this.mapDocumentFromDB(document);
  }

  static async getUserDocuments(): Promise<Document[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        uploaded_by_profile:profiles!uploaded_by(name),
        verified_by_profile:profiles!verified_by(name)
      `)
      .eq('uploaded_by', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapDocumentFromDB);
  }

  static async getPendingDocuments(): Promise<Document[]> {
    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        uploaded_by_profile:profiles!uploaded_by(name),
        verified_by_profile:profiles!verified_by(name)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapDocumentFromDB);
  }

  static async verifyDocument(documentId: string, approved: boolean, notes?: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const updates: any = {
      status: approved ? 'verified' : 'rejected',
      verified_by: user.id,
      verification_date: new Date().toISOString()
    };

    if (!approved && notes) {
      updates.rejection_reason = notes;
    }

    const { error } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', documentId);

    if (error) throw error;

    // Update verification steps
    if (approved) {
      await supabase
        .from('verification_steps')
        .update({
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('document_id', documentId)
        .eq('completed', false);
    }
  }

  static async getDocumentByHash(hash: string): Promise<Document | null> {
    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        uploaded_by_profile:profiles!uploaded_by(name),
        verified_by_profile:profiles!verified_by(name)
      `)
      .eq('blockchain_hash', hash)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return this.mapDocumentFromDB(data);
  }

  static async getVerificationSteps(documentId: string) {
    const { data, error } = await supabase
      .from('verification_steps')
      .select('*')
      .eq('document_id', documentId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  static async getDocumentUrl(filePath: string): Promise<string> {
    const { data } = await supabase.storage
      .from('documents')
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    return data?.signedUrl || '';
  }

  private static mapDocumentFromDB(doc: any): Document {
    return {
      id: doc.id,
      title: doc.title,
      type: doc.type,
      status: doc.status,
      uploadDate: new Date(doc.created_at).toLocaleDateString(),
      hash: doc.blockchain_hash,
      size: doc.file_size,
      tags: doc.tags || [],
      verifiedBy: doc.verified_by_profile?.name,
      verificationDate: doc.verification_date ? new Date(doc.verification_date).toLocaleDateString() : undefined
    };
  }
}