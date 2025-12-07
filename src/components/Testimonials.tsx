import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      text: 'An absolutely incredible experience! The team took care of every detail, and our trip to Bali was beyond our wildest dreams. Highly recommended!',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Michael Chen',
      location: 'Singapore',
      rating: 5,
      text: 'Professional service from start to finish. They helped us plan the perfect honeymoon in Santorini. Everything was flawless!',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Emma Williams',
      location: 'London, UK',
      rating: 5,
      text: 'I have traveled with many companies, but this one stands out. Their attention to detail and customer care is exceptional. Will definitely book again!',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real experiences from real travelers who trusted us with their dream vacations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <Quote className="h-10 w-10 text-blue-200 dark:text-blue-600 mb-4" />
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{testimonial.text}</p>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - Customer testimonial from ${testimonial.location}`}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
