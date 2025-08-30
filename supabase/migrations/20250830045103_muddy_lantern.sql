/*
  # BlockVerify Initial Database Schema

  1. New Tables
    - `profiles` - User profile information extending Supabase auth
      - `id` (uuid, references auth.users)
      - `name` (text)
      - `role` (enum: admin, verifier, user)
      - `avatar_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `documents` - Document storage and metadata
      - `id` (uuid, primary key)
      - `title` (text)
      - `type` (text)
      - `status` (enum: pending, verified, rejected)
      - `file_path` (text)
      - `file_size` (bigint)
      - `blockchain_hash` (text, unique)
      - `tags` (text array)
      - `uploaded_by` (uuid, references profiles)
      - `verified_by` (uuid, references profiles, optional)
      - `verification_date` (timestamp, optional)
      - `rejection_reason` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `verification_steps` - Audit trail for verification process
      - `id` (uuid, primary key)
      - `document_id` (uuid, references documents)
      - `step_name` (text)
      - `completed` (boolean)
      - `completed_at` (timestamp, optional)
      - `notes` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Users can only see their own documents
    - Verifiers can see pending documents
    - Admins can see all documents

  3. Storage
    - Create storage bucket for document files
    - Set up RLS policies for file access
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'verifier', 'user');
CREATE TYPE document_status AS ENUM ('pending', 'verified', 'rejected');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  status document_status NOT NULL DEFAULT 'pending',
  file_path text NOT NULL,
  file_size bigint NOT NULL,
  blockchain_hash text UNIQUE NOT NULL,
  tags text[] DEFAULT '{}',
  uploaded_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  verified_by uuid REFERENCES profiles(id),
  verification_date timestamptz,
  rejection_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create verification steps table
CREATE TABLE IF NOT EXISTS verification_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  step_name text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_steps ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Documents policies
CREATE POLICY "Users can read own documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (uploaded_by = auth.uid());

CREATE POLICY "Verifiers can read pending documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    status = 'pending' AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('verifier', 'admin')
    )
  );

CREATE POLICY "Admins can read all documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can insert own documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Verifiers can update document status"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('verifier', 'admin')
    )
  );

-- Verification steps policies
CREATE POLICY "Users can read verification steps for own documents"
  ON verification_steps
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents 
      WHERE id = document_id AND uploaded_by = auth.uid()
    )
  );

CREATE POLICY "Verifiers can read and update verification steps"
  ON verification_steps
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('verifier', 'admin')
    )
  );

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload documents"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Users can read own documents"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();