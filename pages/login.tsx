import { Box, Grommet, Main } from 'grommet';

const LoginPage = () => {
  const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};
  return (
  <Grommet theme={theme}>
    <Box basis="full" height="large" direction='row' flex>
        <Box pad="medium" flex align='center' justify='center' background={{
                "color": "neutral-1",
                "dark": true,
                "opacity": true,
                "repeat": "no-repeat",
                "size": "cover",
                "image": "url(https://storage.googleapis.com/coberry-ui/berries.jpg)",
          }}
        />
        <Box pad="large" align="center" justify="center" background="light-3">
        <a href="http://localhost:8080/auth">
          Sign in
        </a>
        </Box>
      </Box>
  </Grommet>
)}

export default LoginPage;

/*
Box fill>
    <AppBar>
      <Heading level='3' margin='none'>My App</Heading>
      <Button icon={<Notification />} onClick={() => {}} />
    </AppBar>
+   <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
+     <Box flex align='center' justify='center'>
+       app body
+     </Box>
+     <Box
+       width='medium'
+       background='light-2'
+       elevation='small'
+       align='center'
+       justify='center'
+     >
+       sidebar
+     </Box>
+   </Box>
+ </Box>
*/