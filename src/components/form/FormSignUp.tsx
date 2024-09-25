import { Divider, Input, Radio } from 'antd';

const FormSignUp = () => {
  return (
    <>
      <div className="p-8 bg-slate-200 rounded-lg">
        <h2 className="font-bold text-2xl text-center mb-5">Welcome to FKoi Shop</h2>
        <p className="font-light text-base text-center mb-8">Sign Up and Start Learning!</p>
        <Input className="my-4 text-sm" size="large" placeholder="Full Name" />
        <Input className="my-4 text-sm" size="large" placeholder="Email address" />
        <Input className="my-4 text-sm" size="large" placeholder="Password" />
        <Radio>I'm in for emails with exciting discounts and personalized recommendations</Radio>
        <br />
        <button className="my-4 w-full bg-amber-500 px-4 py-2 rounded-md hover:bg-stone-900 hover:text-white">
          Next
        </button>
        <p className="text-center">
          Or{' '}
          <a href="#" className="text-amber-500 hover:underline">
            Forgot password
          </a>
          .
        </p>
        <Divider />
        <p className="text-center text-sm">
          By signing up, you agree to our{' '}
          <a className="text-amber-500 hover:underline" href="#">
            Terms of Use
          </a>{' '}
          and{' '}
          <a className="text-amber-500 hover:underline" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default FormSignUp;
