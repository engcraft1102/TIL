# 회원 인증 구현

### LoginPage.js (Mui 사용한 버전)

```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useCallback, useReducer, useState } from 'react'
import { Box } from '@mui/system'
import {
  FormControl,
  Input,
  TextField,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '../components/common/Button'
import AuthTemplate from '../components/auth/AuthTemplate'
import AuthForm from '../components/auth/AuthForm'

const sizes = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '360px',
}

const wrap = css`
  section {
    width: 480px;

    @media (max-width: ${sizes.desktop}) {
      width: 100%;
    }
    @media (max-width: ${sizes.mobile}) {
      width: 100%;
    }

    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -6rem;
  }

  img {
    width: 200px;
  }

  /* Mui Global Class*/
  .MuiFormControl-root {
    margin: 0;
    width: 100%;
    justify-content: center;
  }
`

const formStyle = css`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 20px;
  background: white;
  border-radius: 4px;
  border: 1px solid #d4d3d3;

  .formHeader {
    font-family: 'Noto Sans KR';
    font-weight: normal;
  }
`

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    showPassword: false,
  })

  const onChange = (prop) => (e) => {
    setState({
      ...state,
      [prop]: e.target.value,
    })
  }

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    })
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }

  return (
    <div css={wrap}>
      <section>
        <img src="/images/logo/logo_white_horizontal.png" alt="" />
        <div css={formStyle}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
            }}
          >
            <div className="formHeader">이메일로 로그인</div>
            <TextField
              id="text-email"
              name="email"
              label="이메일"
              variant="standard"
              value={state.email}
              onChange={onChange('email')}
            />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="text-password">비밀번호</InputLabel>
              <Input
                id="text-password"
                name="password"
                label="비밀번호"
                type={state.showPassword ? 'text' : 'password'}
                variant="standard"
                value={state.password}
                onChange={onChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button>버튼</Button>
          </Box>
        </div>
      </section>
    </div>
  )
}

export default Login
```

