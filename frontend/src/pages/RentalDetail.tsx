import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { messagesAPI, rentalsAPI } from '../services/api';
import { ReviewCard } from '../components/ReviewCard';
import { Review } from '../types/api';
import { Link } from 'react-router-dom';

export default function RentalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: rental,
    isLoading: isLoadingRental,
    error: rentalError,
  } = useQuery({
    queryKey: ['rentals', id],
    queryFn: () => rentalsAPI.getById(Number(id)),
    enabled: !!id,
  });

  const {
    data: reviews,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useQuery({
    queryKey: ['reviews', Number(id)],
    queryFn: () => rentalsAPI.getMessages(Number(id)),
    enabled: !!rental,
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rental || !message.trim()) return;

    setSendingMessage(true);
    try {
      await messagesAPI.send({
        rental_id: rental.id,
        message: message.trim(),
      });
      setMessage('');
      alert('Message envoyé avec succès !');
      queryClient.invalidateQueries({ queryKey: ['reviews', rental.id] });
    } catch (err) {
      alert("Erreur lors de l'envoi du message");
    } finally {
      setSendingMessage(false);
    }
  };

  if (isLoadingRental || isLoadingReviews) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-xl text-gray-600'>Chargement...</p>
      </div>
    );
  }

  if (rentalError || reviewsError || !rental) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <p className='text-xl text-red-600 mb-4'>Location introuvable</p>
        <button
          onClick={() => navigate('/')}
          className='text-primary hover:underline'
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8 flex justify-between items-center'>
        <button
          onClick={() => navigate('/')}
          className='text-primary hover:underline flex items-center gap-2'
        >
          ← Retour
        </button>
        <Link
          to={`/rental/${rental.id}/update`}
          className='bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors'
        >
          Modifier la location
        </Link>
      </div>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='relative h-96'>
          <img
            src={`${import.meta.env.VITE_API_URL}${rental.picture}`}
            alt={rental.name}
            className='w-full h-full object-cover'
          />
        </div>

        <div className='p-8'>
          <div className='flex justify-between items-start mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                {rental.name}
              </h1>
              <p className='text-gray-600'>Propriétaire: {rental.owner.name}</p>
            </div>
            <div className='text-right'>
              <p className='text-3xl font-bold text-primary'>
                {rental.price} €
              </p>
              <p className='text-gray-600'>par mois</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-gray-600 text-sm'>Surface</p>
              <p className='text-xl font-semibold text-gray-600'>
                {rental.surface} m²
              </p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-gray-600 text-sm'>Ajouté le</p>
              <p className='text-xl font-semibold text-gray-600'>
                {new Date(rental.created_at).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-xl font-bold text-gray-900 mb-3'>
              Description
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {rental.description}
            </p>
          </div>

          <div className='border-t pt-6'>
            <h2 className='text-xl font-bold text-gray-900 mb-4'>
              Contactez le propriétaire
            </h2>
            <form onSubmit={handleSendMessage} className='space-y-4'>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Votre message...'
                rows={4}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
              />
              <button
                type='submit'
                disabled={sendingMessage}
                className='bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50'
              >
                {sendingMessage ? 'Envoi...' : 'Envoyer le message'}
              </button>
            </form>
          </div>

          <div className='mt-8 border-t pt-6'>
            <h2 className='text-xl font-bold text-gray-900 mb-3'>Avis</h2>
            {reviews?.messages.map((review: Review) => {
              return (
                <ReviewCard
                  key={`${review.created_at}_${review.author}`}
                  message={review.message}
                  author={review.author}
                  created_at={review.created_at}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
