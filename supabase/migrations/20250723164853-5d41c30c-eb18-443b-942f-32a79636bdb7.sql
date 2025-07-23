
-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('lovable-uploads', 'lovable-uploads', true);

-- Create RLS policies for the storage bucket
CREATE POLICY "Admin users can upload files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'lovable-uploads' AND
  auth.uid() IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
);

CREATE POLICY "Admin users can view files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'lovable-uploads' AND
  auth.uid() IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
);

CREATE POLICY "Admin users can update files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'lovable-uploads' AND
  auth.uid() IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
);

CREATE POLICY "Admin users can delete files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'lovable-uploads' AND
  auth.uid() IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
);

-- Allow public read access for serving files
CREATE POLICY "Public can view files" ON storage.objects
FOR SELECT USING (bucket_id = 'lovable-uploads');
