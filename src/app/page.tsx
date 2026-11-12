import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="py-20 lg:py-28">
      <Container className="flex flex-col items-center text-center">
        <Badge variant="gold" size="md" className="mb-6">
          Official EMSA-ECUSTA Student Body
        </Badge>
        <h1 className="max-w-4xl font-serif text-4xl font-bold tracking-tight text-content-primary sm:text-6xl">
          Cultivating Clinical Excellence. <br />
          <span className="text-brand-gold">Shape Our Medical Future.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-content-secondary sm:text-lg">
          EMSA-ECUSTA represents the medical student body at Catholic University of Health
          Sciences—driving academic excellence, community health advocacy, and peer leadership.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="lg">
            EXPLORE COMMITTEES
          </Button>
          <Button variant="secondary" size="lg">
            MEET THE BOARD
          </Button>
        </div>
      </Container>
    </div>
  );
}
