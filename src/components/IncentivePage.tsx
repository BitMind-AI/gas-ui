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
              <span className="math-var">MCC</span> = <span className="fraction">
                <span className="numerator">(<span className="math-var">TP</span> × <span className="math-var">TN</span>) − (<span className="math-var">FP</span> × <span className="math-var">FN</span>)</span>
                <span className="denominator">√[(<span className="math-var">TP</span> + <span className="math-var">FP</span>)(<span className="math-var">TP</span> + <span className="math-var">FN</span>)(<span className="math-var">TN</span> + <span className="math-var">FP</span>)(<span className="math-var">TN</span> + <span className="math-var">FN</span>)]</span>
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
                  <span className="math-var">Image</span><span className="math-subscript">Score</span> = 0.5 × <span className="math-var">MCC</span><span className="math-subscript">multiclass</span> + 0.5 × <span className="math-var">MCC</span><span className="math-subscript">binary</span>
                </div>
              </div>
              <div className="formula-step">
                <strong>Video Score:</strong>
                <div className="formula">
                  <span className="math-var">Video</span><span className="math-subscript">Score</span> = 0.5 × <span className="math-var">MCC</span><span className="math-subscript">multiclass</span> + 0.5 × <span className="math-var">MCC</span><span className="math-subscript">binary</span>
                </div>
              </div>
              <div className="formula-step final-score">
                <strong>Total Score:</strong>
                <div className="formula">
                  <span className="math-var">Total</span><span className="math-subscript">Score</span> = <span className="fraction">
                    <span className="numerator"><span className="math-var">Image</span><span className="math-subscript">Score</span> + <span className="math-var">Video</span><span className="math-subscript">Score</span></span>
                    <span className="denominator">2</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="threshold-system">
            <h3 className="subsection-title">Threshold System</h3>
            <p className="section-description">
              For a discriminator to receive rewards, it must exceed a dynamic threshold calculated based on 
              the previous top performer's score and improvement magnitude.
            </p>
            
            <div className="formula-container">
              <div className="formula-step final-score">
                <strong>Dynamic Threshold Equation:</strong>
                <div className="formula">
                  <span className="math-var">Threshold</span>(<span className="math-var">x</span>) = max(<span className="math-var">S</span> + 0.01, <span className="math-var">S</span> + <span className="math-var">boost</span> − <span className="fraction">
                    <span className="numerator"><span className="math-var">boost</span> − 0.01</span>
                    <span className="denominator">140</span>
                  </span> × <span className="math-var">x</span>)
                </div>
                <div className="threshold-note">
                  Where <span className="math-var">boost</span> = min(0.05, min(1, <span className="fraction">
                    <span className="numerator">(<span className="math-var">S</span><span className="math-subscript">new</span> − <span className="math-var">S</span><span className="math-subscript">prev</span>) × <span className="math-var">h</span></span>
                    <span className="denominator">0.10</span>
                  </span>) × 0.10)
                </div>
                <div className="threshold-note">
                  <span className="math-var">S</span> = new top model's composite MCC score, <span className="math-var">x</span> = epochs since win, <span className="math-var">h</span> = 1 + recent_additions_ratio (capped at 1.5)
                </div>
              </div>
            </div>
            
            <div className="threshold-example">
              <h4 className="example-title">📊 Example Calculation</h4>
              <div className="example-steps">
                <div className="example-step">
                  <strong>Given:</strong> S<sub>prev</sub> = 0.85, S<sub>new</sub> = 0.92, Recent additions = 20%
                </div>
                <div className="example-step">
                  <strong>Step 1:</strong> δ = 0.92 − 0.85 = 0.07
                </div>
                <div className="example-step">
                  <strong>Step 2:</strong> h = 1 + 0.20 = 1.2, δ<sub>adj</sub> = 0.07 × 1.2 = 0.084
                </div>
                <div className="example-step">
                  <strong>Step 3:</strong> innovation_factor = min(1, 0.084/0.10) = 0.84
                </div>
                <div className="example-step">
                  <strong>Step 4:</strong> boost = min(0.05, 0.84 × 0.10) = 0.05
                </div>
                <div className="example-step">
                  <strong>Step 5:</strong> T<sub>0</sub> = 0.92 + 0.05 = 0.97
                </div>
                <div className="example-step">
                  <strong>Step 6:</strong> floor = 0.92 + 0.01 = 0.93
                </div>
                <div className="example-step">
                  <strong>Step 7:</strong> decay_rate = (0.97 − 0.93) / 140 ≈ 0.000286
                </div>
                <div className="example-result">
                  <strong>Results:</strong>
                  <ul>
                    <li>T(0) = 0.97 (immediate threshold)</li>
                    <li>T(40) ≈ 0.9586 (end of day 2)</li>
                    <li>T(140) = 0.93 (clamps after 1 week)</li>
                  </ul>
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
                <p>The discriminator with the highest total score that exceeds the dynamic threshold receives the entire reward pool for that epoch.</p>
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
                  <span className="math-var">Fool</span><span className="math-subscript">Rate</span> = <span className="fraction">
                    <span className="numerator"><span className="math-var">Successful</span><span className="math-subscript">Attacks</span></span>
                    <span className="denominator"><span className="math-var">Total</span><span className="math-subscript">Attempts</span></span>
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
