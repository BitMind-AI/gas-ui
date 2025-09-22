import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  DiscriminatorEntry,
  GeneratorEntry,
  SystemStats,
  DiscriminatorDetailedStats,
  FilterState,
  ApiError
} from '../types/api';

class BitMindApiClient {
  private client: AxiosInstance;
  private baseURL = 'https://gas.bitmind.ai';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          status: error.response?.status,
        };
        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Get discriminator leaderboard
   */
  async getDiscriminatorLeaderboard(limit: number = 50): Promise<DiscriminatorEntry[]> {
    try {
      const response: AxiosResponse<DiscriminatorEntry[]> = await this.client.get(
        `/api/v1/analytics/leaderboard?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching discriminator leaderboard:', error);
      throw error;
    }
  }

  /**
   * Get generator leaderboard
   */
  async getGeneratorLeaderboard(
    limit: number = 50,
    minAttempts: number = 1
  ): Promise<GeneratorEntry[]> {
    try {
      const response: AxiosResponse<GeneratorEntry[]> = await this.client.get(
        `/api/v1/analytics/generator-leaderboard?limit=${limit}&min_attempts=${minAttempts}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching generator leaderboard:', error);
      throw error;
    }
  }

  /**
   * Get system statistics
   */
  async getSystemStats(): Promise<SystemStats> {
    try {
      const response: AxiosResponse<SystemStats> = await this.client.get(
        '/api/v1/analytics/stats'
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching system stats:', error);
      throw error;
    }
  }

  /**
   * Get detailed discriminator statistics
   */
  async getDiscriminatorDetails(discriminatorId: number): Promise<DiscriminatorDetailedStats> {
    try {
      const response: AxiosResponse<DiscriminatorDetailedStats> = await this.client.get(
        `/api/v1/analytics/discriminator-stats/${discriminatorId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching discriminator details:', error);
      throw error;
    }
  }

  /**
   * Get filtered discriminator leaderboard based on modality
   */
  async getFilteredDiscriminatorLeaderboard(filters: FilterState): Promise<DiscriminatorEntry[]> {
    const data = await this.getDiscriminatorLeaderboard(filters.limit);
    
    // Client-side filtering by modality if needed
    // Note: The API doesn't seem to support modality filtering directly,
    // so we'll filter based on scores being > 0
    if (filters.modality === 'image') {
      return data.filter(entry => entry.image_score > 0);
    } else if (filters.modality === 'video') {
      return data.filter(entry => entry.video_score > 0);
    }
    
    return data;
  }

  /**
   * Get filtered generator leaderboard
   */
  async getFilteredGeneratorLeaderboard(filters: FilterState): Promise<GeneratorEntry[]> {
    let data = await this.getGeneratorLeaderboard(filters.limit, filters.minAttempts);
    
    // Filter by modality
    if (filters.modality !== 'all') {
      data = data.filter(entry => 
        entry.modalities.includes(filters.modality)
      );
    }
    
    return data;
  }
}

// Create and export a singleton instance
export const apiClient = new BitMindApiClient();
export default apiClient;
