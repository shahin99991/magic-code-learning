import { Box, Container, Typography, Link, useTheme } from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            {'© '}
            <Link color="inherit" href="/">
              Magic Code Learning
            </Link>{' '}
            {currentYear}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <Link
              href="/terms"
              color="text.secondary"
              underline="hover"
              sx={{ typography: 'body2' }}
            >
              利用規約
            </Link>
            <Link
              href="/privacy"
              color="text.secondary"
              underline="hover"
              sx={{ typography: 'body2' }}
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/contact"
              color="text.secondary"
              underline="hover"
              sx={{ typography: 'body2' }}
            >
              お問い合わせ
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 