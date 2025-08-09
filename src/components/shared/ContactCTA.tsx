import { Button } from '@/components/ui/button';
import { GitHubIcon, LinkedInIcon } from '@/components/shared/SocialIcons';

export default function ContactCTA({ onSendMessageClick }: { onSendMessageClick: () => void }) {
    return (
      <section 
        key="cta" 
        className="text-center bg-black text-primary-foreground py-16 px-8 rounded-xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Have a project in mind? <br/> Let's build it together.
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
          I'm currently available for new projects and opportunities. Feel free to send me a message!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full">
              <LinkedInIcon className="h-5 w-5 mr-2" />
              Connect on LinkedIn
            </Button>
          </a>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onSendMessageClick} 
            className="w-full sm:w-auto bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            Or send a message
          </Button>
        </div>
      </section>
    );
  }