import { Button } from "@/components/ui/button";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comments: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://donations-prdd.onrender.com/api/contact/send-email", {
        to: "contact@openingdoorstolife.org",
        ...formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('Response:', response);

      toast.success("Message sent successfully!");
      setFormData({ name: "", phone: "", email: "", comments: "" });
    } catch (error) {
      console.error("Error details:", error);
      toast.error(`Failed to send message: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Navbar Section */}
      <Navbar />

      {/* Contact Section */}
      <div className="flex items-center justify-center min-h-screen p-6 mt-10 bg-gray-400">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 p-6 bg-gray-200 border rounded-xl lg:grid-cols-2 bg-green">
          {/* Contact Details */}
          <div className="flex flex-col gap-2">
            <div className="space-y-8">
              <div className="text-3xl font-bold text-gray-800">
                {t("contact.title")}
              </div>
            </div>
            <main className="flex flex-col gap-3 my-auto">
              <div className="text-gray-700 mail">
                <div className="mb-2 text-lg font-bold">
                  {t("contact.mail")}
                </div>
                <div className="text">{t("contact.mailValue")}</div>
              </div>
              <div className="text-gray-700 address">
                <div className="mb-2 text-lg font-bold">
                  {t("contact.address")}
                </div>
                <div className="text">{t("contact.addressValue")}</div>
              </div>
              <div className="text-gray-700 phone">
                <div className="mb-2 text-lg font-bold">
                  {t("contact.phone")}
                </div>
                <div className="text">{t("contact.phoneValue")}</div>
              </div>
              <div className="text-gray-700 service">
                <div className="mb-2 text-lg font-bold">
                  {t("contact.service")}
                </div>
                <div className="text">{t("contact.serviceValue")}</div>
              </div>
            </main>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-6 rounded-lg bg-gray-50 shadow-inner-2xl"
          >
            <div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact.form.namePlaceholder")}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("contact.form.phonePlaceholder")}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contact.form.emailPlaceholder")}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder={t("contact.form.commentsPlaceholder")}
                className="w-full p-2 border rounded-md"
                rows="4"
                required
              />
            </div>
            <Button type="submit" className="bg-gray">
              {t("contact.form.submitButton")}
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Contact;
