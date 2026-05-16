import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full border-b bg-blue-50/95 backdrop-blur supports-[backdrop-filter]:bg-blue-50/90 sticky top-0 z-50 shadow-sm">
      <div className="container flex h-24 items-center px-4 md:px-6">
        <Image
          src="/logo-ameli-header.png"
          alt="L'Assurance Maladie"
          width={1920}
          height={640}
          className="h-auto w-auto max-h-20"
          priority
        />

        <div className="flex-1" />

        <Button variant="ghost" size="icon" className="text-primary flex-shrink-0">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  )
}
