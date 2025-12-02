import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const curriculum = [
  "Quran, Arabic and Islamic Moral",
  "Practical Life Exercises",
  "Sensorial Exercises",
  "Mathematics",
  "English Language",
  "Geography",
  "History",
  "Biology",
  "Cultural Awareness",
  "Art and Craft",
  "Social Study",
  "Civic Education",
  "Science and Nature",
  "Computer (ICT)",
  "Coding",
  "Yoruba",
  "French"
];

const commitments = [
  {
    "title": "Helping children develop socially",
    "description": "The Montessori Prepared Environment helps children develop socially by providing a heterogeneous classroom where children of mixed ages interact, collaborate, and learn from each other, fostering empathy and respect.\n\nIt encourages cooperative work, sharing, and peaceful conflict resolution, which helps children build communication skills, self-confidence, and positive relationships with peers and adults.\n\nChildren acquire socially acceptable behaviors, learn to wait patiently for their turns, avoid vulgar movements, exercise restraint, and use polite language."
  },
  {
    "title": "Helping children develop their intelligence",
    "description": "Children are exposed to hands-on activities which enable them to learn from concrete to abstract concepts.\n\nThe environment provides sensory materials that stimulate exploration, problem-solving, and critical thinking.\n\nAs Maria Montessori stated, \"The hand is the instrument of intelligence\"."
  },
  {
    "title": "Fostering abiding curiosity",
    "description": "Freedom in the environment allows children to pick their own work and follow interests at their own pace, which keeps curiosity alive.\n\nLearning is driven by internal questions rather than external rewards.\n\nThe environment is ordered and beautiful; everything is scaled to the child’s size, uncluttered, and has a specific place.\n\nThis promotes a sense of safety and clarity, helping their curiosity to flourish."
  },
  {
    "title": "Helping children develop high self-esteem",
    "description": "The materials in the environment are self-correcting and hands-on, allowing children to learn by doing and discovering errors independently.\n\nThese materials give feedback without waiting for adult approval, which helps build the child’s confidence.\n\nMixed age groups encourage collaboration rather than competition, increasing confidence in older children while inspiring the younger ones."
  },
  {
    "title": "Develop positive attitude towards school and learning",
    "description": "The Montessori Environment gives children the freedom to choose meaningful hands-on activities that spark curiosity and build confidence.\n\nIts calm, respectful, and individualized learning approach helps children feel successful and genuinely excited to learn."
  },
  {
    "title": "Cultivating the habit of initiative and persistence",
    "description": "The environment cultivates initiative by allowing children to choose their own work and encouraging them to take responsibility for starting tasks independently.\n\nPersistence is built through engaging, self-correcting materials that invite repeated practice, developing concentration and the satisfaction of completing challenging activities."
  },
  {
    "title": "Assisting children build good thinking and concentration skills",
    "description": "Good thinking and concentration skills are built as children work with carefully sequenced materials that require them to observe, explore, and solve problems independently.\n\nAs children work at their own paces, they are able to build good concentration and thinking skills."
  },
  {
    "title": "Initiating inner security, self-discipline and a sense of order",
    "description": "The Montessori Environment fosters inner security by providing a predictable, calm, and respectful setting where children feel safe to explore and make choices independently by adhering to ground rules.\n\nIt promotes self-discipline and a sense of order through structured routines, carefully organized materials, and practical life activities that teach children to take responsibility for their actions, care for their environment, and develop consistent good habits."
  }
]



export default function AboutContent() {
  return (
    <section id="about" className="w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              About Self-Starters House Montessori
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are committed to holistic development and to harnessing the potential of the child; by providing a distinctive rounded education of uniformly high quality, in a Montessori prepared environment.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-12 py-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline">Our Curriculum</CardTitle>
                <CardDescription>Self-starters House Montessori School is a faith-based school where we offer children an authentic Montessori program. Our comprehensive program allows your child to work and play. Our curriculum is rich and developmentally appropriate. The quality of our instruction is world class, and our children would be able to adapt to their immediate environment and continue their education in any country seamlessly.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {curriculum.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}
                </div>
                <h4 className="font-headline text-md font-semibold mt-4">Co-curricular Activities</h4>
                <p className="text-sm text-muted-foreground">Our co-curricular activities include physical exercises like swimming and Karate lessons; we also go on nature walk to familiarize ourselves with our immediate surroundings and field trips to places of interest.</p>
              </CardContent>
            </Card>
             <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline">Our Rationale</CardTitle>
                <CardDescription>Early Childhood Education in Nigeria is making a headway, but progress is very slow. Most schools, both privately owned and government owned are yet to get it right. Their focus is always on the intellectual development of the child without catering for all the other areas of development.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Children learn better when they are physically and emotionally secure. The early years are the most crucial time in a child's life when nature has bestowed on the child natural gifts that can help him reach his highest potential. These gifts, however, may be lost forever if the child is not in an environment where these innate abilities can be harnessed. For children to be able to think out of the box, early childhood is the best time to start. We need to produce children who are thinkers. Most of the jobs in existence today were not in existence ten years or twenty years ago. Children need to be prepared for a dynamic world where things are always changing.</p>
              </CardContent>
            </Card>
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline">Our Commitments</CardTitle>
                <CardDescription>We are committed to the following principles:</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {commitments.map((commitment, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-sm">{commitment.title}</AccordionTrigger>
                      <AccordionContent>
                        {commitment.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-muted-foreground">We strive to be one of the best nursery/primary schools in Nigeria by the year 2035 and one of the leading educational institutions in West Africa, delivering a world-class and well-rounded education by the year 2040.</p>
              </CardContent>
            </Card>
             <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">We are committed to holistic development and to harnessing the potential of the child; by providing a distinctive rounded education of uniformly high quality, in a Montessori prepared environment.</p>
              </CardContent>
            </Card>
            <Card id="preparatory" className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl scroll-mt-20">
              <CardHeader>
                <CardTitle className="font-headline">Preparatory Class</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Our preparatory class is our foundation class for every child. That’s why we have developed our curriculum that combines academic, social-emotional and spiritual elements to provide a solid foundation for young children as they prepare for their future. Our program is designed for children between the ages of 18 months and 3 years.</p>
              </CardContent>
            </Card>
            <Card id="nursery-primary" className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl scroll-mt-20">
              <CardHeader>
                <CardTitle className="font-headline">Nursery & Primary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Our experienced team understands that growing children need a balance of hand-holding and independence to navigate through life, build the grit they need to and therefore put together a learning program that sparks creativity and innovation in our learners. We run a 6 years program from grades 1 to 6 that prepares students for entrance exams into secondary school as well as get them ready for life.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
