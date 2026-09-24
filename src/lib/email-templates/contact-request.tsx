import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { brand, container, footer, heading, main, text } from './email-brand'

interface ContactRequestProps {
  name?: string
  whatsapp?: string
  email?: string
  organization?: string
  eventType?: string
  interest?: string
  message?: string
}

const ContactRequestEmail = ({
  name = 'Não informado',
  whatsapp = 'Não informado',
  email = 'Não informado',
  organization = 'Não informada',
  eventType = 'Não informado',
  interest = 'Não informado',
  message = 'Não informada',
}: ContactRequestProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Nova solicitação de {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>GRUPO REDE CONECTA</Text>
        <Heading style={heading}>Nova solicitação pelo site</Heading>
        <Text style={text}><strong>Nome:</strong> {name}</Text>
        <Text style={text}><strong>WhatsApp:</strong> {whatsapp}</Text>
        <Text style={text}><strong>E-mail:</strong> {email}</Text>
        <Text style={text}><strong>Organização:</strong> {organization}</Text>
        <Text style={text}><strong>Tipo de evento:</strong> {eventType}</Text>
        <Text style={text}><strong>Interesse:</strong> {interest}</Text>
        <Text style={text}><strong>Mensagem:</strong><br />{message}</Text>
        <Text style={footer}>Enviado pelo formulário Fale Conosco do site.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactRequestEmail,
  subject: (data) => `Nova solicitação pelo site — ${String(data['name'] || 'Visitante')}`,
  displayName: 'Solicitação recebida pela equipe',
  previewData: {
    name: 'Mariana Silva',
    whatsapp: '(19) 99999-9999',
    email: 'mariana@exemplo.com',
    organization: 'Comunidade Esperança',
    eventType: 'Palestra',
    interest: 'Família e relacionamentos',
    message: 'Gostaria de receber uma proposta para nosso próximo encontro.',
  },
  to: 'contato@gruporedeconecta.com.br',
} satisfies TemplateEntry