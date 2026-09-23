import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { theme } from '../theme/theme';
import { Competition, Language } from '../types';
import { Header } from '../components/Header';
import { HeroMetrics } from '../components/HeroMetrics';
import { JudgeCard } from '../components/JudgeCard';
import { UrgencyBanner } from '../components/UrgencyBanner';
import { DatesGrid } from '../components/DatesGrid';
import { PreviousWinners } from '../components/PreviousWinners';
import { TabbedContent } from '../components/TabbedContent';
import { RewardsList } from '../components/RewardsList';
import { InfoAndReferral } from '../components/InfoAndReferral';
import { StickyFooter } from '../components/StickyFooter';
import { BottomNavBar } from '../components/BottomNavBar';

const MOCK_USER_ID = '65f1a2b3c4d5e6f7a8b9c0d1';
const MOCK_COMPETITION_ID = '65f000000000000000000001';
const API_BASE_URL = 'http://localhost:5000/api/competitions';

// Fallback offline mock data for instant preview if server is disconnected
const FALLBACK_COMPETITION: Competition = {
  _id: MOCK_COMPETITION_ID,
  title: 'Feedants Classical Dance',
  category: 'Dance',
  tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
  prizePool: 1500,
  entryFee: 99,
  totalSpots: 20,
  bookedSpots: 14,
  status: 'open',
  isUserRegistered: false,
  spotsLeft: 6,
  judge: {
    name: 'Manju Dubey',
    title: 'Kathak Exponent & Choreographer',
    experience: 'Professional Kathak Dancer • 12+ Years of Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  dates: {
    registerBefore: new Date(Date.now() + 100000000).toISOString(),
    submissionStarts: new Date(Date.now() + 200000000).toISOString(),
    submissionEnds: new Date(Date.now() + 500000000).toISOString(),
    resultDate: new Date(Date.now() + 800000000).toISOString(),
  },
  previousWinners: [
    {
      name: 'Aanya Sharma',
      rank: 1,
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      name: 'Riya Patel',
      rank: 2,
      photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      name: 'Sneha Verma',
      rank: 3,
      photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      name: 'Pooja Iyer',
      rank: 4,
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ],
  tabs: {
    about: `Welcome to the Feedants Classical Dance Competition! This online event offers a platform for traditional Indian dance forms such as Kathak, Bharatanatyam, Odissi, Manipuri, and Kuchipudi. Showcase your grace, rhythm, storytelling, and stage presence from the comfort of your home. Participants are judged on expression (Abhinaya), rhythm (Tala), posture, and overall presentation.`,
    judgingParameters: `Submissions are evaluated on four key pillars:
1. Technical Precision & Rhythm (30%): Mastery of footwork (Tatkar), hand gestures (Mudras), and beat timing.
2. Expression & Storytelling (30%): Facial expressions (Mukhajabhinaya) conveying emotional depth.
3. Choreography & Presentation (20%): Fluid transitions, posture, and traditional attire.
4. Video & Audio Quality (20%): Clear lighting, full-body visibility, and unedited dance audio track.`,
    rules: `1. Entry is strictly open to solo performers of all age groups.
2. Video duration must be between 1 minute 30 seconds and 3 minutes.
3. Submissions must be filmed horizontally in high resolution (min 720p).
4. Only unedited, single-take video recordings will be accepted; post-production speed modifications or cuts will lead to disqualification.
5. All participants must pay the ₹99 entry fee prior to uploading their submission.`,
  },
  rewards: [
    { rank: 1, prize: 550 },
    { rank: 2, prize: 300 },
    { rank: 3, prize: 240 },
    { rank: 4, prize: 200 },
    { rank: 5, prize: 130 },
    { rank: 6, prize: 80 },
  ],
};

export const CompetitionDetailScreen: React.FC = () => {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [registering, setRegistering] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('ENG');
  const [activeNavTab, setActiveNavTab] = useState<string>('Competitions');

  // Fetch Competition Details from API
  const fetchCompetition = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/${MOCK_COMPETITION_ID}?userId=${MOCK_USER_ID}`);
      const result = await response.json();

      if (result.success && result.data) {
        setCompetition(result.data);
      } else {
        // Fallback if ID not yet seeded
        setCompetition(FALLBACK_COMPETITION);
      }
    } catch (err) {
      console.log('Backend API offline, utilizing fallback mock dataset.');
      setCompetition(FALLBACK_COMPETITION);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetition();
  }, []);

  // Handle Registration Action (Calls Atomic Backend Endpoint)
  const handleRegister = async () => {
    if (!competition) return;

    try {
      setRegistering(true);
      const response = await fetch(`${API_BASE_URL}/${competition._id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: MOCK_USER_ID }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        setCompetition(result.data);
        Alert.alert(
          '🎉 Registration Successful!',
          'You are now registered for Feedants Classical Dance. You can upload your performance submission anytime before the deadline.',
          [{ text: 'Great!' }]
        );
      } else {
        // Fallback offline simulation if backend server is not running
        setCompetition((prev) =>
          prev
            ? {
                ...prev,
                isUserRegistered: true,
                bookedSpots: prev.bookedSpots + 1,
                spotsLeft: Math.max(0, prev.spotsLeft! - 1),
              }
            : prev
        );
        Alert.alert('🎉 Registered!', result.message || 'Registration completed successfully.');
      }
    } catch (err) {
      // Offline fallback behavior
      setCompetition((prev) =>
        prev
          ? {
              ...prev,
              isUserRegistered: true,
              bookedSpots: prev.bookedSpots + 1,
              spotsLeft: Math.max(0, prev.spotsLeft! - 1),
            }
          : prev
      );
      Alert.alert(
        '🎉 Registration Complete!',
        'You have successfully registered for Feedants Classical Dance!'
      );
    } finally {
      setRegistering(false);
    }
  };

  const handleUploadSubmission = () => {
    Alert.alert(
      'Upload Submission',
      'Select a video file from your device to submit for evaluation.',
      [{ text: 'Choose Video' }, { text: 'Cancel', style: 'cancel' }]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading Competition Details...</Text>
      </View>
    );
  }

  if (!competition) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load competition details.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCompetition}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isFull = (competition.spotsLeft ?? (competition.totalSpots - competition.bookedSpots)) <= 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />

      {/* Header */}
      <Header
        language={language}
        onLanguageChange={(lang) => setLanguage(lang)}
        onBackPress={() => Alert.alert('Navigation', 'Back arrow clicked')}
      />

      {/* Scrollable Content Body */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Metrics */}
        <HeroMetrics
          title={competition.title}
          isRegistered={competition.isUserRegistered}
          tags={competition.tags}
          prizePool={competition.prizePool}
          entryFee={competition.entryFee}
          totalSpots={competition.totalSpots}
          bookedSpots={competition.bookedSpots}
        />

        {/* Urgency Countdown Banner */}
        <UrgencyBanner targetDate={competition.dates.registerBefore} />

        {/* Judge Profile Card */}
        <JudgeCard judge={competition.judge} />

        {/* Important Dates Grid */}
        <DatesGrid dates={competition.dates} />

        {/* Previous Winners Carousel */}
        <PreviousWinners winners={competition.previousWinners} />

        {/* Tabbed Content (About / Judging Criteria / Rules) */}
        <TabbedContent tabs={competition.tabs} />

        {/* Rewards List */}
        <RewardsList rewards={competition.rewards} />

        {/* Informational & Referral Banners */}
        <InfoAndReferral />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <StickyFooter
        isRegistered={competition.isUserRegistered}
        entryFee={competition.entryFee}
        onRegisterPress={handleRegister}
        onUploadPress={handleUploadSubmission}
        loading={registering}
        isFull={isFull}
      />

      {/* Bottom Persistent Navigation Bar Mockup */}
      <BottomNavBar
        activeTab={activeNavTab}
        onTabPress={(tab) => setActiveNavTab(tab)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  bottomSpacer: {
    height: theme.spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  errorText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.danger,
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  retryButtonText: {
    color: theme.colors.textInverted,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

export default CompetitionDetailScreen;
