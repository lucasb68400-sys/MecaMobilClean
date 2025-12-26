import React from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Hook personnalisé pour une animation de fondu simple à l'affichage de l'écran.
 * @param {number} duration - Durée de l'animation en millisecondes.
 * @returns {object} Le style animé à appliquer au composant racine de l'écran.
 */
export const useScreenFadeIn = (duration = 300) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useFocusEffect(
    React.useCallback(() => {
      // Animation d'apparition
      opacity.value = withTiming(1, { duration });

      // Fonction de nettoyage pour réinitialiser l'opacité en quittant
      return () => {
        opacity.value = 0;
      };
    }, [duration])
  );

  return animatedStyle;
};