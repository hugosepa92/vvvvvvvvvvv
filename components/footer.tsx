export default function Footer() {
  return (
    <footer className="bg-blue-50 border-t border-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-sm mb-3">À propos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>L'Assurance Maladie</li>
              <li>Nos missions</li>
              <li>Nous contacter</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mon compte Ameli</li>
              <li>Mes remboursements</li>
              <li>Mes démarches</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Aide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Questions fréquentes</li>
              <li>Guides pratiques</li>
              <li>Sécurité</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 Assurance Maladie - Tous droits réservés</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Données personnelles
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
