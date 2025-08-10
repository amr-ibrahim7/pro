'use client';

import React, { useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Linkedin } from 'lucide-react';
import FramerSuccessAnimation from './FramerSuccessAnimation';


function LoadingSpinner(props: React.SVGProps<SVGSVGElement>) {
  return ( <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> )
}

interface ProjectFooterCTAProps {
  title?: string;
  description?: string;
  linkedinUrl: string; 
}

export default function ProjectFooterCTA({
  title = "Thanks for reading till the end!",
  description = "If you have any questions, please reach out to me on LinkedIn or send a message.",
  linkedinUrl 
}: ProjectFooterCTAProps) {
    const formRef = useRef<HTMLFormElement>(null);
  const [state, handleSubmit] = useForm('meqyanay');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open && state.succeeded) {
      formRef.current?.reset();
    }
  };

  return (
    <>

      <section className="max-w-3xl mx-auto mt-24 bg-black rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white">
        {title}
        </h2>
        <p className="mt-4 text-lg text-[#727273]">
        {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 mr-2" />
              Connect on LinkedIn
            </a>
          </Button>

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
                    <DialogClose asChild>
                      <Button type="button">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Send a Message</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      required
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />

                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Type your message here."
                      required
                      rows={5}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm" />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={state.submitting}>
                      {state.submitting && <LoadingSpinner className="mr-2 h-4 w-4" />}
                      Send message
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
}