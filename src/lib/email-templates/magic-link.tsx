import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import { brand, button, container, footer, heading, main, text } from './email-brand'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  siteName,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Seu link de acesso ao {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>GRUPO REDE CONECTA</Text>
        <Heading style={heading}>Seu link de acesso</Heading>
        <Text style={text}>
          Use o botão abaixo para acessar o {siteName}. Este link expira em breve.
        </Text>
        <Button className="dm-btn" style={button} href={confirmationUrl}>
          Acessar
        </Button>
        <Text style={footer}>
          Se você não solicitou este link, ignore este e-mail com segurança.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

