import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Layout,
  Calendar,
  BarChart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "./globals.css";
import CompanyCarousel from "@/components/company-carousel";
import Image from "next/image";
import Footer from "@/components/footer";
import FAQ from "@/components/faq";

const faqs = [
  {
    question: "What is ZCRUM?",
    answer:
      "ZCRUM is a powerful project management tool designed to help teams organize, track, and manage their work efficiently. It combines intuitive design with robust features to streamline your workflow and boost productivity.",
  },
  {
    question: "How does ZCRUM compare to other project management tools?",
    answer:
      "ZCRUM offers a unique combination of intuitive design, powerful features, and flexibility. Unlike other tools, we focus on providing a seamless experience for both agile and traditional project management methodologies, making it versatile for various team structures and project types.",
  },
  {
    question: "Is ZCRUM suitable for small teams?",
    answer:
      "Absolutely! ZCRUM is designed to be scalable and flexible. It works great for small teams and can easily grow with your organization as it expands. Our user-friendly interface ensures that teams of any size can quickly adapt and start benefiting from ZCRUM's features.",
  },
  {
    question: "What key features does ZCRUM offer?",
    answer:
      "ZCRUM provides a range of powerful features including intuitive Kanban boards for visualizing workflow, robust sprint planning tools for agile teams, comprehensive reporting for data-driven decisions, customizable workflows, time tracking, and team collaboration tools. These features work seamlessly together to enhance your project management experience.",
  },
  {
    question: "Can ZCRUM handle multiple projects simultaneously?",
    answer:
      "Yes, ZCRUM is built to manage multiple projects concurrently. You can easily switch between projects, and get a bird's-eye view of all your ongoing work. This makes ZCRUM ideal for organizations juggling multiple projects or clients.",
  },
  {
    question: "Is there a learning curve for new users?",
    answer:
      "While ZCRUM is packed with features, we've designed it with user-friendliness in mind. New users can quickly get up to speed thanks to our intuitive interface, helpful onboarding process, and comprehensive documentation.",
  },
];

const features = [
  {
    title: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description:
      "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description:
      "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      {/* TODO:make this section responsive */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold pb-6 flex flex-col text-gray-800">
          Streamline Your Workflow <br />
          <span className="flex mx-auto gap-3 sm:gap-4 items-center">
            with
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold pb-6 flex flex-col">
              <span className="bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-900 bg-clip-text text-transparent">
                BRAINWAVE
              </span>
              <span className="w-full h-1 bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-900 mt-2 block"></span>
            </h1>
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Empower your team with our intuitive project management solution.
        </p>
        <Link href="/onboarding">
          <Button
            size="lg"
            className="mr-4 bg-violet-600 hover:bg-violet-700 text-white"
          >
            Get Started <ChevronRight size={18} className="ml-1" />
          </Button>
        </Link>
        <Link href="#features">
          <Button
            size="lg"
            variant="outline"
            className="mr-4 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800"
          >
            Learn More
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Key Features
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white shadow-md border border-gray-200"
              >
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mb-4 text-violet-500" />
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Carousel */}
      <section className="py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Trusted by Industry Leaders
          </h3>
          <CompanyCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      {/* <FAQ /> */}

      {/* CTA Section */}
      <section className="py-20 text-center px-5 bg-violet-100">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-xl mb-12 text-gray-700">
            Join thousands of teams already using BRAINWAVE to streamline their
            projects and boost productivity.
          </p>
          <Link href="/onboarding">
            <Button
              size="lg"
              className="bg-violet-600 text-white hover:bg-violet-700"
            >
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
