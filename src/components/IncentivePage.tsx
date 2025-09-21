import React from 'react';

const IncentivePage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">💰 Incentive Mechanism</span>
        </h1>
        <p className="page-subtitle">
          Mathematical framework for BitMind GAS reward distribution
        </p>
      </div>

      <div className="incentive-content">
        {/* Matthews Correlation Coefficient */}
        <div className="math-section">
          <h2 className="section-title">📊 Matthews Correlation Coefficient (MCC)</h2>
          <p className="section-description">
            The foundation of our scoring system is the Matthews Correlation Coefficient, 
            which provides a balanced measure of classification quality even with imbalanced datasets.
          </p>
          
          <div className="formula-container">
            <div className="formula-title">MCC Formula:</div>
            <div className="formula">
              MCC = <span className="fraction">
                <span className="numerator">(TP × TN) - (FP × FN)</span>
                <span className="denominator">√[(TP + FP)(TP + FN)(TN + FP)(TN + FN)]</span>
              </span>
            </div>
            <div className="formula-legend">
              <p><strong>Where:</strong></p>
              <ul>
                <li><strong>TP</strong> = True Positives</li>
                <li><strong>TN</strong> = True Negatives</li>
                <li><strong>FP</strong> = False Positives</li>
                <li><strong>FN</strong> = False Negatives</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Discriminator Scoring */}
        <div className="math-section">
          <h2 className="section-title">🛡️ Discriminator Scoring System</h2>
          
          <div className="scoring-breakdown">
            <h3 className="subsection-title">Classification Problem</h3>
            <p>Discriminators classify content into three categories:</p>
            <div className="classification-categories">
              <span className="category real">Real</span>
              <span className="category ai">AI Generated</span>
              <span className="category inpainting">Inpainting</span>
            </div>
          </div>

          <div className="scoring-formula">
            <h3 className="subsection-title">Score Calculation</h3>
            <div className="formula-container">
              <div className="formula-step">
                <strong>Image Score:</strong>
                <div className="formula">
                  Image_Score = 0.5 × MCC_multiclass + 0.5 × MCC_binary
                </div>
              </div>
              <div className="formula-step">
                <strong>Video Score:</strong>
                <div className="formula">
                  Video_Score = 0.5 × MCC_multiclass + 0.5 × MCC_binary
                </div>
              </div>
              <div className="formula-step final-score">
                <strong>Total Score:</strong>
                <div className="formula">
                  Total_Score = <span className="fraction">
                    <span className="numerator">Image_Score + Video_Score</span>
                    <span className="denominator">2</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="reward-structure">
            <h3 className="subsection-title">Reward Distribution</h3>
            <div className="reward-card winner-take-all">
              <div className="reward-icon">🏆</div>
              <div className="reward-details">
                <h4>Winner Take All</h4>
                <p>The discriminator with the highest total score receives the entire reward pool for that epoch.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Generator Scoring */}
        <div className="math-section">
          <h2 className="section-title">🎯 Generator Scoring System</h2>
          
          <div className="scoring-formula">
            <h3 className="subsection-title">Fool Rate Calculation</h3>
            <div className="formula-container">
              <div className="formula-step">
                <strong>Fool Rate:</strong>
                <div className="formula">
                  Fool_Rate = <span className="fraction">
                    <span className="numerator">Successful_Attacks</span>
                    <span className="denominator">Total_Attempts</span>
                  </span> × 100%
                </div>
              </div>
              <div className="time-window">
                <strong>Time Window:</strong> Past 10 days
              </div>
            </div>
          </div>

          <div className="reward-structure">
            <h3 className="subsection-title">Reward Distribution</h3>
            <div className="reward-card ema-distribution">
              <div className="reward-icon">📈</div>
              <div className="reward-details">
                <h4>EMA-Based Real-Time Rewards</h4>
                <p>Generators are rewarded in real-time based on their fool rate performance using an Exponential Moving Average (EMA) distribution mechanism.</p>
                <div className="ema-benefits">
                  <ul>
                    <li>Continuous reward distribution</li>
                    <li>Performance-weighted allocation</li>
                    <li>Smoothed volatility through EMA</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="math-section summary-section">
          <h2 className="section-title">📋 Summary</h2>
          <div className="summary-grid">
            <div className="summary-card discriminator-summary">
              <h3>🛡️ Discriminators</h3>
              <ul>
                <li>MCC-based scoring (multiclass + binary)</li>
                <li>50-50 split between image and video</li>
                <li>Winner-take-all reward structure</li>
                <li>Epoch-based distribution</li>
              </ul>
            </div>
            <div className="summary-card generator-summary">
              <h3>🎯 Generators</h3>
              <ul>
                <li>Fool rate percentage over 10 days</li>
                <li>Real-time reward distribution</li>
                <li>EMA-weighted allocation</li>
                <li>Continuous performance tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncentivePage;
