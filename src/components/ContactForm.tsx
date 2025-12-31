"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(), // Spam protection
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot) {
      return; // Bot detected, silently fail
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // WhatsApp number (Bangladesh format without +)
      const whatsappNumber = "8801751299259";

      // Build message from form data or use default
      const name = data.name?.trim() || "Someone";
      const email = data.email?.trim() || "Not provided";
      const subject = data.subject?.trim() || "General Inquiry";
      const message = data.message?.trim() || "Hi! I'd like to connect with you.";

      // Format the WhatsApp message
      const whatsappMessage = `*New Portfolio Contact*

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
            Name *
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">
          Subject *
        </label>
        <input
          id="subject"
          {...register("subject")}
          className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
          placeholder="What's this about?"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={6}
          className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
          placeholder="Tell me about your project or inquiry..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <p className="text-emerald-400">
            WhatsApp opened! Send the message to connect with me.
          </p>
        </motion.div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-400">
            {errorMessage || "Failed to send message. Please try again."}
          </p>
        </motion.div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send via WhatsApp
          </>
        )}
      </Button>
    </motion.form>
  );
}

