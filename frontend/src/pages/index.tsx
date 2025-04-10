import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Link do Bem - Plataforma de Voluntariado Digital</title>
        <meta name="description" content="Conecte-se a oportunidades de voluntariado digital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Faça a diferença no mundo digital
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Conecte-se a oportunidades de voluntariado digital e contribua para causas importantes sem sair de casa.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/opportunities" className="btn-primary">
                Ver Oportunidades
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link href="/about" className="btn-secondary">
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 