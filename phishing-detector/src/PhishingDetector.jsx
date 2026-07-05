import { useState, useEffect } from 'react'

const RISK_LEVELS = {
  LOW:      { label: 'Low Risk',      bar: 'bg-green-500',  text: 'text-green-400',  border: 'border-green-700',  bg: 'bg-green-950/40'  },
  MEDIUM:   { label: 'Medium Risk',   bar: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-700', bg: 'bg-yellow-950/40' },
  HIGH:     { label: 'High Risk',     bar: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-700', bg: 'bg-orange-950/40' },
  CRITICAL: { label: 'Critical Risk', bar: 'bg-red-500',    text: 'text-red-400',    border: 'border-red-700',    bg: 'bg-red-950/40'    },
}

function getRisk(result, confidence) {
  if (result === 'SAFE') return confidence >= 80 ? 'LOW' : 'MEDIUM'
  if (confidence >= 90) return 'CRITICAL'
  if (confidence >= 75) return 'HIGH'
  return 'MEDIUM'
}

function RiskMeter({ confidence, result }) {
  const risk = getRisk(result, confidence)
  const level = RISK_LEVELS[risk]
  const percent = result === 'SAFE' ? 100 - confidence : confidence
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Risk Level</span>
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${level.text} ${level.border} bg-gray-900`}>
          {level.label}
        </span>
      </div>
      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${level.bar}`} style={{ width: `${percent}%` }} />
        <div className={`absolute top-0 h-full rounded-full opacity-40 blur-sm transition-all duration-1000 ${level.bar}`} style={{ width: `${percent}%` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>Safe</span>
        <span>Dangerous</span>
      </div>
    </div>
  )
}

function KeywordBadge({ word, isPhishing }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
      isPhishing
        ? 'bg-red-900/40 border-red-700 text-red-300'
        : 'bg-green-900/40 border-green-700 text-green-300'
    }`}>
      {isPhishing ? '⚠️' : '✅'} {word}
    </span>
  )
}

function HistoryItem({ item, onClick }) {
  const isPhishing = item.result === 'PHISHING'
  return (
    <div
      onClick={() => onClick(item)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer hover:bg-gray-800 transition-all duration-200 ${
        isPhishing ? 'border-red-900/60 bg-red-950/20' : 'border-green-900/60 bg-green-950/20'
      }`}
    >
      <span className="text-lg">{isPhishing ? '🚨' : '✅'}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 truncate">{item.text.slice(0, 55)}...</p>
        <p className={`text-xs mt-0.5 font-semibold ${isPhishing ? 'text-red-400' : 'text-green-400'}`}>
          {isPhishing ? 'Phishing' : 'Safe'} · {item.confidence}% confidence
        </p>
      </div>
      <span className="text-xs text-gray-600 shrink-0">{item.time}</span>
    </div>
  )
}

export default function PhishingDetector() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [animateResult, setAnimateResult] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (result) {
      setAnimateResult(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimateResult(true)))
    }
  }, [result])

  const analyzeEmail = async () => {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const response = await fetch('https://phishguard-api-nwz0.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const data = await response.json()
      setResult(data)
      const now = new Date()
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setHistory(prev => [{ ...data, text, time: timeStr, id: Date.now() }, ...prev.slice(0, 19)])
    } catch {
      setError('Could not connect to the detection server. Make sure Flask is running.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setText(''); setResult(null); setError(null) }

  const copyResult = () => {
    if (!result) return
    const kw = result.keywords?.join(', ') || 'none'
    navigator.clipboard.writeText(`PhishGuard Result\nStatus: ${result.result}\nConfidence: ${result.confidence}%\nKey Indicators: ${kw}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadFromHistory = (item) => {
    setText(item.text)
    setResult({ result: item.result, confidence: item.confidence, keywords: item.keywords })
    setShowHistory(false)
  }

  const isPhishing = result?.result === 'PHISHING'
  const card = darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'
  const textarea = darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col transition-colors duration-300`}>

      {darkMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl" />
        </div>
      )}

      {/* Header */}
      <header className={`relative z-10 border-b ${darkMode ? 'border-gray-800/80' : 'border-gray-200'} px-6 py-4 flex items-center gap-3`}>
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">🛡️</div>
        <div>
          <span className="font-black text-lg tracking-tight">PhishGuard</span>
          <span className={`text-xs ml-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>Cybersecurity Science · FUT Minna</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
            Model Active
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`text-xs px-3 py-1.5 rounded-lg transition ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`relative text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'}`}
          >
            📋 History
            {history.length > 0 && (
              <span className="bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {history.length > 9 ? '9+' : history.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row gap-6 px-4 md:px-8 py-10 max-w-6xl mx-auto w-full">

        {/* Left */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Phishing Email <span className="text-blue-400">Detector</span>
            </h1>
            <p className={`mt-2 text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Paste any email below. Our AI detects phishing attempts and explains exactly why.
            </p>
          </div>

          {/* Input */}
          <div className={`border rounded-2xl p-5 shadow-2xl ${card}`}>
            <div className="flex items-center justify-between mb-3">
              <label className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Content</label>
              <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{text.length} chars</span>
            </div>
            <textarea
              className={`w-full h-48 border rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition ${textarea}`}
              placeholder={`Paste email text here...\n\ne.g. "Urgent! Your GTBank account has been suspended. Click here to verify your BVN immediately."`}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={analyzeEmail}
                disabled={loading || !text.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/30"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Analysing...
                  </span>
                ) : '🔍 Analyse Email'}
              </button>
              {(result || text) && (
                <button onClick={reset} className={`px-5 font-semibold py-3 rounded-xl transition-all active:scale-95 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-950/60 border border-red-800 text-red-300 rounded-xl px-5 py-4 text-sm flex gap-3 items-start">
              <span className="text-lg">⚠️</span><span>{error}</span>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className={`rounded-2xl border p-6 shadow-2xl transition-all duration-500 ${animateResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isPhishing ? 'bg-red-950/40 border-red-800/70' : 'bg-green-950/40 border-green-800/70'}`}>

              {/* Top row */}
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg shrink-0 ${isPhishing ? 'bg-red-900/60 animate-pulse' : 'bg-green-900/60'}`}>
                  {isPhishing ? '🚨' : '✅'}
                </div>
                <div className="flex-1">
                  <div className={`text-2xl font-black ${isPhishing ? 'text-red-400' : 'text-green-400'}`}>
                    {isPhishing ? 'Phishing Detected' : 'Email Looks Safe'}
                  </div>
                  <div className="text-gray-400 text-sm mt-0.5">
                    Confidence: <span className="text-white font-bold">{result.confidence}%</span>
                  </div>
                </div>
                <button
                  onClick={copyResult}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition flex items-center gap-1.5"
                >
                  {copied ? '✅ Copied' : '📋 Copy'}
                </button>
              </div>

              {/* Risk meter */}
              <RiskMeter confidence={result.confidence} result={result.result} />

              {/* Keywords */}
              {result.keywords && result.keywords.length > 0 && (
                <div className={`mt-4 rounded-xl px-4 py-3 border ${isPhishing ? 'bg-red-900/20 border-red-800/40' : 'bg-green-900/20 border-green-800/40'}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isPhishing ? 'text-red-400' : 'text-green-400'}`}>
                    {isPhishing ? '⚠️ Why this is suspicious' : '✅ Why this looks legitimate'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {result.keywords.map((kw, i) => <KeywordBadge key={i} word={kw} isPhishing={isPhishing} />)}
                  </div>
                  <p className="text-xs text-gray-500">
                    {isPhishing
                      ? 'These words and phrases are strongly associated with phishing emails in the model\'s training data.'
                      : 'These words and phrases are commonly found in legitimate emails and contributed to the safe classification.'
                    }
                  </p>
                </div>
              )}

              {/* Caution messages */}
              {isPhishing && (
                <div className="mt-4 bg-red-900/20 border border-red-800/40 rounded-xl px-4 py-3 text-sm text-red-300 leading-relaxed">
                  ⛔ <strong>Do not</strong> click any links, download attachments, or provide personal information such as BVN, NIN, passwords, or bank details. Report this email to your institution's IT security team.
                </div>
              )}
              {!isPhishing && result.confidence >= 80 && (
                <div className="mt-4 bg-green-900/20 border border-green-800/40 rounded-xl px-4 py-3 text-sm text-green-300 leading-relaxed">
                  ✅ This email appears legitimate. Always exercise caution with links or attachments, especially if the email requests sensitive information.
                </div>
              )}
              {!isPhishing && result.confidence < 80 && (
                <div className="mt-4 bg-yellow-900/20 border border-yellow-800/40 rounded-xl px-4 py-3 text-sm text-yellow-300 leading-relaxed">
                  ⚠️ The model is moderately confident this is safe but the result is borderline. Verify the sender's email address carefully before responding or clicking any links.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="lg:w-72 flex flex-col gap-4">
          <div className={`border rounded-2xl p-5 ${card}`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Model Stats</h3>
            <div className="space-y-4">
              {[
                { label: 'Training Emails', value: '24,394',         icon: '📧' },
                { label: 'Accuracy',        value: '97.56%',         icon: '🎯' },
                { label: 'False Negatives', value: '32',             icon: '🔒' },
                { label: 'Algorithm',       value: 'Voting Ensemble', icon: '🌲' },
                { label: 'Datasets',        value: '2 + Nigerian',   icon: '🗄️' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="text-lg">{stat.icon}</span>
                  <div>
                    <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {history.length > 0 && (
            <div className={`border rounded-2xl p-5 ${card}`}>
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>This Session</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black text-red-400">{history.filter(h => h.result === 'PHISHING').length}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Phishing</div>
                </div>
                <div className="bg-green-950/40 border border-green-900/50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black text-green-400">{history.filter(h => h.result === 'SAFE').length}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Safe</div>
                </div>
              </div>
            </div>
          )}

          <div className={`border rounded-2xl p-5 ${card}`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Phishing Tips</h3>
            <ul className="space-y-2">
              {[
                'Real banks never ask for BVN or PIN via email',
                'Check the sender email address carefully',
                'Hover over links before clicking',
                'Urgent language is always a red flag',
                'Legit orgs use your real name not "Dear Customer"',
              ].map((tip, i) => (
                <li key={i} className={`flex gap-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="text-blue-500 shrink-0">›</span><span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* History drawer */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setShowHistory(false)} />
          <div className={`w-full max-w-md flex flex-col h-full overflow-hidden ${darkMode ? 'bg-gray-900 border-l border-gray-800' : 'bg-white border-l border-gray-200'}`}>
            <div className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <h2 className="font-bold text-lg">Check History</h2>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {history.length === 0
                ? <p className="text-gray-500 text-sm text-center mt-10">No history yet</p>
                : history.map((item) => <HistoryItem key={item.id} item={item} onClick={loadFromHistory} />)
              }
            </div>
            {history.length > 0 && (
              <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <button onClick={() => { setHistory([]); setShowHistory(false) }} className="w-full text-sm text-red-400 hover:text-red-300 py-2 rounded-lg hover:bg-red-950/30 transition">
                  Clear History
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className={`relative z-10 border-t px-6 py-4 text-center text-xs ${darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
        PhishGuard · Cybersecurity Science · FUT Minna · Voting Ensemble · 97.56% Accuracy
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease forwards; opacity:0; }
      `}</style>
    </div>
  )
}
