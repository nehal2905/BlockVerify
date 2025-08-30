import { supabase } from '../lib/supabase';
import { Analytics } from '../types';

export class AnalyticsService {
  static async getAnalytics(): Promise<Analytics> {
    // Get total uploads
    const { count: totalUploads } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true });

    // Get total verifications
    const { count: totalVerifications } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'verified');

    // Get pending requests
    const { count: pendingRequests } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get rejected documents
    const { count: rejectedDocuments } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'rejected');

    return {
      totalUploads: totalUploads || 0,
      totalVerifications: totalVerifications || 0,
      pendingRequests: pendingRequests || 0,
      rejectedDocuments: rejectedDocuments || 0
    };
  }

  static async getAllUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        documents:documents(count)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}