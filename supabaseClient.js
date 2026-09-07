// ========================================================
// FILE: supabaseClient.js
// Description: Supabase Client Initialization
// ========================================================

const SUPABASE_URL = 'https://wmhweeeyulhmoilypklz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtaHdlZWV5dWxobW9pbHlwa2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMDEzMDYsImV4cCI6MjEwMTU3NzMwNn0._X3dAzw24Yi1gPAlG7PFJMSRiZgcOVE3x2zlu9yVU-4';

// 🟢 ผูกตัวแปรเข้ากับ window เพื่อให้ทุกไฟล์ HTML/JS เรียกใช้ได้ 100%
if (typeof supabase !== 'undefined') {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Supabase Client initialized successfully');
} else {
    console.error('❌ ไม่พบ Supabase SDK! กรุณาตรวจสอบว่าได้ใส่ CDN ของ Supabase ก่อนไฟล์นี้ในหน้า HTML');
}
