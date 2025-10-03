import RegistrationForm from '@/components/register/registration-form';

export default function RegisterPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 md:py-24">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Online Registration</h1>
        <p className="text-muted-foreground md:text-xl">
          Complete the form below to begin your application process at CampusConnect.
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
}
