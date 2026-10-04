import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const LINE_CHANNEL_ACCESS_TOKEN = "GTxi4SJLMULsuqzmncRgwnmzlyvsKDHnyKrZeUs7FL9p71pcUW1cJUDPo0J6o27AcrjFct1INfn2CdT5ypgvT/0r+SGcalYPx/PR+hmKxRZUQ/Tm03hpdVRT0g9CC0xehR/Co0QhF05Qp+lBFtu+DgdB04t89/1O/w1cDnyilFU="

// ใส่รหัส Your user ID ที่เพิ่งเจอจากหน้าจอของคุณตรงนี้โดยตรง
const ADMIN_USER_ID = "U01280b3d852bbb43be532ec1602f38c4";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' 
      } 
    })
  }

  try {
    const body = await req.json()
    console.log("📥 Payload received from POS:", JSON.stringify(body));

    if (body.events) {
      return new Response(JSON.stringify({ success: true, message: "Webhook ignored" }), { 
        status: 200, 
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } 
      });
    }

    let messages = [];

    const flexContent = body.flexPayload || body.flex || body.payload || body.contents;
    const textContent = body.messageBody || body.message || body.text;

    if (flexContent) {
      messages.push({
        type: "flex",
        altText: "รายงานยอดขายประจำวัน",
        contents: flexContent
      });
    } else if (textContent) {
      messages.push({
        type: "text",
        text: textContent
      });
    } else {
      messages.push({
        type: "text",
        text: "แจ้งเตือนรายงานยอดขายจากระบบ POS"
      });
    }

    // ยิงตรงไปที่ User ID ของคุณทันที
    const lineRes = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: ADMIN_USER_ID,
        messages: messages
      }),
    });

    const responseText = await lineRes.text();
    
    if (lineRes.ok) {
      console.log(`✅ Successfully sent to Admin User ID: ${ADMIN_USER_ID}`);
      return new Response(JSON.stringify({ success: true }), { 
        status: 200, 
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } 
      });
    } else {
      console.error(`❌ Failed to send to LINE:`, responseText);
      return new Response(JSON.stringify({ success: false, error: responseText }), { 
        status: 400, 
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } 
      });
    }

  } catch (error) {
    console.error("🔥 Exception:", error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), { 
      status: 500, 
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } 
    });
  }
})
