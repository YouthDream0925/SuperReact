import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';


import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';

import { submitLogin } from 'app/auth/store/loginSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(5, 'Password is too short - should be 5 chars minimum.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function LoginPage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);
  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValue('email', 'admin@fusetheme.com', { shouldDirty: true, shouldValidate: true });
    setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
  }, [reset, setValue, trigger]);

  useEffect(() => {
    login.errors.forEach((error) => {
      setError(error.type, {
        type: 'manual',
        message: error.message,
      });
    });
  }, [login.errors, setError]);

  function onSubmit(model) {
    dispatch(submitLogin(model));
  }
  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto items-center justify-center p-16 sm:p-32'
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              {/* <img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" /> */}

              <Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
                Login to your account
              </Typography>

              <form
                name="loginForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      type="text"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      label="Email"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                              user
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      variant="outlined"
                      InputProps={{
                        className: 'pr-2',
                        type: showPassword ? 'text' : 'password',
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              <Icon className="text-20" color="action">
                                {showPassword ? 'visibility' : 'visibility_off'}
                              </Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      required
                    />
                  )}
                />

                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                  <Controller
                    name="remember"
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <FormControlLabel label="Remember Me" control={<Checkbox {...field} />} />
                      </FormControl>
                    )}
                  />

                  <Link className="font-normal" to="/pages/auth/forgot-password">
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="LOG IN"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  Login
                </Button>
              </form>

              <div className="my-24 flex items-center justify-center">
                <Divider className="w-32" />
                <span className="mx-8 font-semibold">OR</span>
                <Divider className="w-32" />
              </div>

              <Button variant="contained" color="secondary" size="small" className="w-192 mb-8">
                Log in with Google
              </Button>

              <Button variant="contained" color="primary" size="small" className="w-192">
                Log in with Facebook
              </Button>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-normal">Don't have an account?</span>
                <Link className="font-normal" to="/register">
                  Create an account
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
