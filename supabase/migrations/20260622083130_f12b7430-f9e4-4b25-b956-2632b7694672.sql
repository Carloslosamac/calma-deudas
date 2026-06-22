CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Service role manages blog images"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');