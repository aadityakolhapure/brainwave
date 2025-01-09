import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What is workflow automation?",
      answer:
        "Workflow automation is the process of automating repetitive tasks within a workflow, helping to increase efficiency and reduce human error.",
    },
    {
      question: "How does task management work?",
      answer:
        "Our platform allows you to create and manage tasks dynamically, ensuring that your to-do lists are always updated and prioritized.",
    },
    {
      question: "Can I integrate with other tools?",
      answer:
        "Yes, we support integrations with tools like Slack, Google Drive, and Notion, so you can centralize all your work in one place.",
    },
    {
      question: "How can I track team progress?",
      answer:
        "You can track your team's progress through real-time updates, notifications, and progress bars that keep you informed of task completions.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use state-of-the-art security protocols to ensure your data is always protected and never shared without your consent.",
    },
  ];

  return (
    <section className="bg-[#1f0036] text-white py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold gradient-title transition">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
