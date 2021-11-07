import {Box, Card, Code, Container, Heading, Inline, Stack, Text, TextArea} from '@sanity/ui'
import studioClient from 'part:@sanity/base/client'
import * as React from 'react'

const client = studioClient.withConfig({apiVersion: 'v2021-03-25', dataset: 'production'})

interface Contact {
  _id: string
  name: string
  primaryContact: string
  password: string
}
export const Contacts = () => {
  const [contacts, setContacts] = React.useState<Contact[]>()
  React.useEffect(() => {
    // b93d201b-90b4-4485-9d5b-3edc99a94dd1 is my test company
    const query = `*[_type == "entity" && !(_id in path('drafts.**')) && _id != "b93d201b-90b4-4485-9d5b-3edc99a94dd1"] {
      _id,
      name,
      primaryContact,
      "password":password.current
    }`

    client.fetch(query).then((contacts: Contact[]) => {
      contacts.sort((a, b) => a.name.localeCompare(b.name))
      setContacts(contacts)
    })
  }, [])

  if (!contacts || contacts.length === 0) return null

  return (
    <Container width={2}>
      <Card margin={3} padding={4}>
        <Stack space={4}>
          <Heading as="h1" size={5}>
            Écrire à tout le monde
          </Heading>
          <Text as="p">
            Pratique pour envoyer un email groupé, mais il ne faut pas oublier de les mettre en BCC
            (copie cachée) !
          </Text>
          <TextArea
            readOnly
            rows={5}
            padding={3}
            value={contacts.map((contact) => contact.primaryContact).join('; ')}
          />
        </Stack>
      </Card>

      <Card margin={3} padding={4}>
        <Stack space={4}>
          <Heading as="h1" size={5}>
            Mots de passe
          </Heading>
          <Stack space={4}>
            {contacts.map((contact) => {
              return (
                <Card key={contact._id} padding={3} shadow={1} radius={2}>
                  <Stack space={3}>
                    <Heading>
                      <a href={`mailto:${contact.primaryContact}`}>{contact.name}</a>
                    </Heading>
                    <Stack space={2}>
                    <Inline space={1}>
                      <Text size={1}>URL:</Text>
                      <Code size={1}>
                        https://annuaire.lanorvege.no/modification?id={contact._id}
                      </Code>
                    </Inline>
                    <Inline space={2}>
                      <Text size={1}>Mot de passe:</Text>
                      <Code size={1}>{contact.password}</Code>
                    </Inline>
                    </Stack>
                  </Stack>
                </Card>
              )
            })}
          </Stack>
        </Stack>
      </Card>
    </Container>
  )
}
