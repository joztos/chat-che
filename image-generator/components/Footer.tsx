import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-10 w-full mt-auto border-t flex items-center justify-center bg-accents-1 z-20">
      <span className="text-primary">Created by</span>
      <a
        href="https://steamship.com"
        aria-label="Steamship.com Link"
        target="_blank"
        rel="noreferrer"
        className="text-black "
      >
        <Logo
          className="inline-block h-6 ml-3 text-primary"
        /> Steamship
      </a>.
    </footer>
  )
}