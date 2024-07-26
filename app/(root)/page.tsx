// app/(root)/page.tsx
import NavBar from '../components/navbar';
import Card from '../components/card';
import Hero from '../components/hero'

import { createClient } from '../../utils/supabase/server';

const HomePage = async () => {
  const supabase = createClient();

  try {
    const { data: items, error } = await supabase.from('pieces').select('*');

    if (error) {
      console.error('Error loading items:', error);
      return <div>Error loading items</div>;
    }

    if (!items || items.length === 0) {
      console.log('No items found');
      return <div>No items found</div>;
    }

    return (
      <div>
        <NavBar />
        <Hero />
        <h1 className='m-3 text-2xl'>Select Pieces</h1>
        <div className="card-container w-auto mx-10">
          {items.map((item) => (
            <Card key={item.id} name={item.name} image_url={item.image_url} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    return <div>Error fetching data from Supabase</div>;
  }
};

export default HomePage;
