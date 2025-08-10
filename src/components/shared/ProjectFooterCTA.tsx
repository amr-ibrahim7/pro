'use client';

import React, { useRef, useState } from 'react';
import { useForm } from '@formspree/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Linkedin } from 'lucide-react';
import FramerSuccessAnimation from './FramerSuccessAnimation';


function FormDialog({ formId }: { formId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, handleSubmit] = useForm(formId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open && state.succeeded) {
      setTimeout(() => {
        state.succeeded = false; 
      }, 500);
      formRef.current?.reset();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white">
          Send a message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {state.succeeded ? (
          <div>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl">Thanks for your message!</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-center">
              <FramerSuccessAnimation />
              <p className="text-muted-foreground">
                I appreciate you reaching out and will be in touch soon.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button">Close</Button></DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Send a Message</DialogTitle>
              <DialogDescription>Your message will be sent directly to my inbox.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input id="email" type="email" name="email" placeholder="Your Email Address" required />
              <Textarea id="message" name="message" placeholder="Type your message here." required rows={5} />
            </div>
            {state.errors && (
              <div className="mb-4 text-sm text-center text-destructive bg-destructive/10 p-3 rounded-md">
                <p>Something went wrong. Please try again later.</p>
                {process.env.NODE_ENV === 'development' && (
                  <p className='mt-2 text-xs'>Dev Hint: Check if the Formspree ID is correct.</p>
                )}
              </div>
            )}
            <DialogFooter>
              <Button type="submit" disabled={state.submitting}>
                {state.submitting && <div className="animate-spin mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent" />}
                Send message
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}


interface ProjectFooterCTAProps {
  title?: string;
  description?: string;
  linkedinUrl: string;
}

export default function ProjectFooterCTA({ title, description, linkedinUrl }: ProjectFooterCTAProps) {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  return (
    <section className="max-w-3xl mx-auto mt-24 bg-black rounded-xl p-8 text-center">
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <p className="mt-4 text-lg text-[#727273]">{description}</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" variant="secondary">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 mr-2" />
            Connect on LinkedIn
          </a>
        </Button>

        {formId ? (
          <FormDialog formId={formId} />
        ) : (
          <div className="mt-2 text-sm text-yellow-400 self-center">
            (Contact form is not configured)
          </div>
        )}
      </div>
    </section>
  );
}