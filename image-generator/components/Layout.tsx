import type { FC, ReactNode } from 'react'
import Head from 'next/head.js'
import VercelTemplateNav, { VercelTemplateNavProps } from './VercelTemplateNav'
import { ComponentType } from 'react'
import Footer from './Footer'
import Navigation from './Navigation'

export interface LayoutProps extends VercelTemplateNavProps {
  children?: ReactNode
  title?: string
  description?: string
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  path,
  deployButton,
  children,
}) => {
  return (
    <div className="mx-auto h-screen flex flex-col">
      <Head>
        {title && <title>{`${title} - Steamship + Vercel Examples`}</title>}
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* TODO: Remove this <TemplateNav> line when you use the template */}
      <VercelTemplateNav path={path} deployButton={deployButton} />
      <Navigation />
      
      <div className="px-8 bg-accents-0">{children}</div>

      {/* TODO: Replace this <Footer> with your own when you use the template */}
      <Footer />
    </div>
  )
}

export default Layout


const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export interface LayoutProps extends VercelTemplateNavProps {
    children?: ReactNode;
    title?: string;
    description?: string;
}

export function getLayout<LP extends {}>(
  Component: ComponentType<any>
): ComponentType<LP> {
  return (Component as any).Layout || Noop
}