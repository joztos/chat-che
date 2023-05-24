import type { FC, ReactNode } from 'react'
import Head from 'next/head.js'
import Nav, { NavProps } from './Nav'
import { ComponentType } from 'react'

export interface LayoutProps extends NavProps {
  children?: ReactNode
  title?: string
  description?: string
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  path,
  children,
}) => {
  return (
    <div className="mx-auto h-screen flex flex-col">
      <Head>
        {title && <title>{`${title} - Steamship + Vercel Examples`}</title>}
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav path={path} />

      <div className="px-8 bg-accents-0">{children}</div>

      <footer className="py-10 w-full mt-auto border-t flex items-center justify-center bg-accents-1 z-20">
        <span className="text-primary">Created by Samasat Group for&nbsp;</span>
        <a
          href="https://www.emdischool.com/"
          aria-label="EMDISchool.com Link"
          target="_blank"
          rel="noreferrer"
          className="text-black "
        >
          <strong>EMDI school </strong>
        </a>. Powered
        <a
          href="https://vercel.com/templates/next.js/ai-gpt3-chatbot"
          target="_blank"
          rel="noreferrer"
          className="text-black ml-1 mr-1"
        > via <strong>Navi AI</strong>.
        </a> .
      </footer>
    </div>
  )
}

export default Layout

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export interface LayoutProps extends NavProps {
    children?: ReactNode;
    title?: string;
    description?: string;
}

export function getLayout<LP extends {}>(
  Component: ComponentType<any>
): ComponentType<LP> {
  return (Component as any).Layout || Noop
}
