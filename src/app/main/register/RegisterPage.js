import FormHelperText from '@material-ui/core/FormHelperText';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';

import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
import { useEffect } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter your name'),
  company: yup.string().optional(),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(5, 'Password is too short - should be 5 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  name: '',
  company: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTermsConditions: false,
};

function RegisterPage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authRegister = useSelector(({ auth }) => auth.register);

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    authRegister.errors.forEach((error) => {
      setError(error.type, {
        type: 'manual',
        message: error.message,
      });
    });
  }, [authRegister.errors, setError]);

  function onSubmit(model) {
    dispatch(submitRegister(model));
  }

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto items-center justify-center p-16 sm:p-32'
      )}
    >
      <div className="flex flex-col flex-wrap items-center justify-center w-full">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              {/* <img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" /> */}

              <Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
                Create an account
              </Typography>

              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >                  
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      type="text"
                      label="Name"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                              person
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      required
                    />
                  )}
                />
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      type="text"
                      label="Company"
                      error={!!errors.displayName}
                      helperText={errors?.displayName?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                              work
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  )}
                />
               
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
                              email
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      required                                          
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
                      type="password"
                      label="Password"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                              vpn_key
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      required
                    />
                  )}
                />

                <Controller
                  name="passwordConfirm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      type="password"
                      label="Confirm Password"
                      error={!!errors.passwordConfirm}
                      helperText={errors?.passwordConfirm?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                              vpn_key
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      required
                    />
                  )}
                />

                <Controller
                  name="acceptTermsConditions"
                  control={control}
                  render={({ field }) => (
                    <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
                      <FormControlLabel
                        label="I read and accept terms and conditions"
                        control={<Checkbox {...field} />}
                      />
                      <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                    </FormControl>
                  )}
                />

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Register"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  Create an account
                </Button>
              </form>
              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-normal">Already have an account?</span>
                <Link className="font-normal" to="/login">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default RegisterPage;
