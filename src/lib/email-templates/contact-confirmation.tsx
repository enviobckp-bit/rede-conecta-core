import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { brand, container, footer, heading, main, text } from './email-brand'

interface ContactConfirmationProps {
  name?: string
  interest?: string
}

const ContactConfirmationEmail = ({
  name = 'Olá',
  interest = 'sua solicitação',
}: ContactConfirmationProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Recebemos sua mensagem</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>GRUPO REDE CONECTA</Text>
        <Heading style={heading}>Recebemos sua mensagem.</Heading>
        <Text style={text}>Olá, {name}.</Text>
        <Text style={text}>
          Sua solicitação sobre <strong>{interest}</strong> chegou à nossa equipe. Vamos analisar
          as informações com atenção e entraremos em contato pelos dados informados.
        </Text>
        <Text style={text}>Obrigado por escolher caminhar com a REDE.</Text>
        <Text style={footer}>Ninguém deveria caminhar sozinho.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'Recebemos sua solicitação — GRUPO REDE CONECTA',
  displayName: 'Confirmação ao visitante',
  previewData: { name: 'Mariana', interest: 'Família e relacionamentos' },
} satisfies TemplateEntry