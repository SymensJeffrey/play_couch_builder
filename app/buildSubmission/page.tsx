'use client';
import NavBar from '../components/navbar';
import { createClient } from '../../utils/supabase/client';
import { useEffect, useState } from 'react';

const BuildSubmissionPage = () => {

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <NavBar />
    </div>
  );
};

export default BuildSubmissionPage;
