import React from 'react';
import { Box, Container, Typography, Link, useTheme } from '@mui/material';

const Footer: React.FC = () => {
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
          <Typography variant="body2" color="text.secondary">
            {'© '}
            <Link color="inherit" href="/">
              Magic Code Learning
            </Link>{' '}
            {currentYear}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Link
              href="/terms"
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none' }}
            >
              利用規約
            </Link>
            <Link
              href="/privacy"
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none' }}
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/contact"
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none' }}
            >
              お問い合わせ
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 