import { Box, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { ContactForm } from "./contact-form";

export const ContactSection = () => {

    return (
        <Container maxWidth='xl'>
            <Stack direction='row' justifyContent='space-around' gap={5} sx={{ py: 10 }}>
                <Stack direction='column' spacing={3}>
                    <ContactThrough icon='mingcute:location-fill' heading="Address" subHeading="Narayanganj, Dhaka, Bangladesh" />
                    <ContactThrough icon='mdi:email' heading="Email" subHeading="dreamestate@example.com" />
                    <ContactThrough icon='ri:phone-fill' heading="Phone" subHeading="+880187644433" />
                    <ContactThrough icon='mage:globe-fill' heading="Website" subHeading="www.dreamestate.com" />
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="h6" sx={{ color: '#1C2D37', mb: 2 }}>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {[
                                'mdi:instagram',
                                'circum:linkedin',
                                'arcticons:x-twitter',
                                'qlementine-icons:facebook-16',
                            ].map((social) => (
                                <Iconify key={social} width={22} icon={social} />
                            ))}
                        </Box>
                    </Box>
                </Stack>
                <Card sx={{ maxWidth: 500, width: '100%', pt: 4 }}>
                    <Typography
                        variant="h4"
                        color="text.secondary"
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        Schedule a Visit
                    </Typography>
                    <CardContent>
                        <ContactForm />
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    )
}

type ContactThroughProps = {
    heading: string;
    subHeading: string;
    icon: string;
}

const ContactThrough = ({ heading, subHeading, icon }: ContactThroughProps) => (
    <Stack direction='row' alignItems='center' gap={1}>
        <Stack direction='row' alignItems='center' justifyContent='center' sx={{ backgroundColor: '#1C2D37', color: 'text.white', p: 1, borderRadius: '50%' }}>
            <Iconify icon={icon} sx={{ width: 30, height: 30 }} />
        </Stack>
        <Stack>
            <Typography variant="caption" sx={{ fontSize: '1rem', textTransform: 'uppercase', color: '#1C2D37', fontWeight: 'bold' }}>{heading}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{subHeading}</Typography>
        </Stack>
    </Stack>
)