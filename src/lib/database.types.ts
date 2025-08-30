export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          role: 'admin' | 'verifier' | 'user'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          role?: 'admin' | 'verifier' | 'user'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: 'admin' | 'verifier' | 'user'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          title: string
          type: string
          status: 'pending' | 'verified' | 'rejected'
          file_path: string
          file_size: number
          blockchain_hash: string
          tags: string[]
          uploaded_by: string
          verified_by: string | null
          verification_date: string | null
          rejection_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          type: string
          status?: 'pending' | 'verified' | 'rejected'
          file_path: string
          file_size: number
          blockchain_hash: string
          tags?: string[]
          uploaded_by: string
          verified_by?: string | null
          verification_date?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: string
          status?: 'pending' | 'verified' | 'rejected'
          file_path?: string
          file_size?: number
          blockchain_hash?: string
          tags?: string[]
          uploaded_by?: string
          verified_by?: string | null
          verification_date?: string | null
          rejection_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      verification_steps: {
        Row: {
          id: string
          document_id: string
          step_name: string
          completed: boolean
          completed_at: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          step_name: string
          completed?: boolean
          completed_at?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          step_name?: string
          completed?: boolean
          completed_at?: string | null
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'verifier' | 'user'
      document_status: 'pending' | 'verified' | 'rejected'
    }
  }
}