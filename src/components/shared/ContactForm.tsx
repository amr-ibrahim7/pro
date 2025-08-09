'use client'

import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MailIcon } from 'lucide-react';

function LoadingSpinner(props: React.SVGProps<SVGSVGElement>) {
  return ( <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> )
}

export default function ContactForm() {
    const [state, handleSubmit] = useForm('YOUR_FORM_ID')

    if (state.succeeded) {
        return (
          <div className="text-center p-6 rounded-xl bg-black">
            <h3 className="text-xl font-semibold text-primary-foreground">Thanks for your message!</h3>
            <p className="text-muted-foreground mt-2">I'll get back to you soon.</p>
          </div>
        );
      }

  return (
    <form key="form" onSubmit={handleSubmit} className="rounded-xl bg-black p-6 md:p-8">
      <h2 className="flex text-sm font-semibold text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Send me a message</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        Fill out the form below and I'll get back to you as soon as possible.
      </p>
      <div className="mt-6 flex flex-col gap-4">
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="bg-zinc-900 border-zinc-700 focus:ring-primary/20"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />

        <Textarea
          rows={4}
          placeholder="Message"
          id="message"
          name="message"
          aria-label="Message"
          required
          className="bg-zinc-900 border-zinc-700 focus:ring-primary/20"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm" />
        
        <Button type="submit" className="flex-none disabled:cursor-not-allowed disabled:opacity-70" disabled={state.submitting}>
          {state.submitting ? (
            <>
              <LoadingSpinner className="h-5 w-5 mr-2" />
              <span>Sending...</span>
            </>
          ) : (
            'Send message'
          )}
        </Button>
      </div>
    </form>
  );
}