import React, { useState, useRef } from 'react';

/**
 * MoneyCompassForm Component
 * Collects user inputs for age, savings, risk tolerance, and horizon.
 * 
 * @param {function} onSubmit - Function called with form data when submitted
 * @param {boolean} isLoading - Disables the form while loading
 */
function MoneyCompassForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    age: 0,
    monthlySavings: 0,
    priorityReturn: 0,
    prioritySecurity: 0,
    priorityLiquidity: 0,
    investmentHorizon: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = (name === 'age' || name === 'monthlySavings') ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handlePriorityChange = (name, value) => {
    const round5 = (v) => Math.round(v / 5) * 5;
    const numValue = Math.max(0, Math.min(100, round5(Number(value))));
    setFormData((prev) => {
      let newReturn = prev.priorityReturn;
      let newSecurity = prev.prioritySecurity;
      let newLiquidity = prev.priorityLiquidity;

      if (name === 'priorityReturn') {
        newReturn = numValue;
        const remaining = 100 - newReturn;
        newSecurity = round5(remaining / 2);
        newLiquidity = 100 - newReturn - newSecurity;
      } else if (name === 'prioritySecurity') {
        newSecurity = Math.min(numValue, 100 - newReturn);
        newLiquidity = round5(100 - newReturn - newSecurity);
      } else if (name === 'priorityLiquidity') {
        newLiquidity = Math.min(numValue, 100 - newReturn);
        newSecurity = round5(100 - newReturn - newLiquidity);
      }

      // Safeguards
      if (newReturn < 0) newReturn = 0;
      if (newSecurity < 0) newSecurity = 0;
      if (newLiquidity < 0) newLiquidity = 0;

      return {
        ...prev,
        priorityReturn: newReturn,
        prioritySecurity: newSecurity,
        priorityLiquidity: newLiquidity
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const draggingBar = useRef(null);

  const valueFromPointer = (e, trackEl) => {
    const rect = trackEl.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(100, Math.round(ratio * 100 / 5) * 5));
  };

  const handlePointerDown = (name, e) => {
    if (isLoading) return;
    e.preventDefault();
    const trackEl = e.currentTarget;
    trackEl.setPointerCapture(e.pointerId);
    draggingBar.current = { name, trackEl };
    handlePriorityChange(name, valueFromPointer(e, trackEl));

    const onMove = (moveEvt) => {
      handlePriorityChange(name, valueFromPointer(moveEvt, trackEl));
    };
    const onUp = () => {
      draggingBar.current = null;
      trackEl.removeEventListener('pointermove', onMove);
      trackEl.removeEventListener('pointerup', onUp);
    };
    trackEl.addEventListener('pointermove', onMove);
    trackEl.addEventListener('pointerup', onUp);
  };

  return (
    <>
      <form className="bg-white rounded-2xl p-4 md:p-5 shadow-md border border-gray-100 flex flex-col gap-2.5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="age" className="text-sm font-semibold text-gray-800">Alter</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            value={formData.age} 
            onChange={handleChange}
            disabled={isLoading}
            min="18"
            max="120"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0EB689]/30 focus:border-[#0EB689] transition-all outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="monthlySavings" className="text-sm font-semibold text-gray-800">Monatliche Sparrate (€)</label>
          <input 
            type="number" 
            id="monthlySavings" 
            name="monthlySavings" 
            value={formData.monthlySavings} 
            onChange={handleChange}
            disabled={isLoading}
            min="0"
            step="10"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0EB689]/30 focus:border-[#0EB689] transition-all outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="investmentHorizon" className="text-sm font-semibold text-gray-800">Anlagehorizont</label>
          <select 
            id="investmentHorizon" 
            name="investmentHorizon" 
            value={formData.investmentHorizon}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0EB689]/30 focus:border-[#0EB689] transition-all outline-none appearance-none"
          >
            <option value="" disabled>Bitte wählen</option>
            <option value="kurzfristig">Unter 5 Jahre</option>
            <option value="mittelfristig">5 bis 10 Jahre</option>
            <option value="langfristig">Über 10 Jahre</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 mt-1 mb-1">
          <p className="m-0 font-bold text-gray-800 text-[14px]">
            Deine Investment-Prioritäten
          </p>
          <p className="m-0 text-[13px] text-gray-500 mb-2">
            Was ist dir beim Investieren am wichtigsten?<br />
            Verteile 100 % auf diese drei Prioritäten.
          </p>

          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="min-w-[80px] font-semibold text-sm text-gray-800">Rendite</span>
            <div
              className={`flex-1 max-w-[260px] h-2 rounded-md bg-[#E1E8ED] cursor-grab active:cursor-grabbing relative overflow-hidden transition-opacity group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onPointerDown={(e) => handlePointerDown('priorityReturn', e)}
              role="slider"
              aria-label="Rendite"
              aria-valuenow={formData.priorityReturn}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ touchAction: 'none', userSelect: 'none' }}
            >
              <div className="h-full bg-[#0EB689] rounded-md transition-[width] duration-150 ease-out group-hover:brightness-110" style={{ width: `${formData.priorityReturn}%` }} />
            </div>
            <span className="min-w-[34px] font-bold text-sm text-[#0EB689] text-right">{formData.priorityReturn}%</span>
          </div>

          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="min-w-[80px] font-semibold text-sm text-gray-800">Sicherheit</span>
            <div
              className={`flex-1 max-w-[260px] h-2 rounded-md bg-[#E1E8ED] cursor-grab active:cursor-grabbing relative overflow-hidden transition-opacity group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onPointerDown={(e) => handlePointerDown('prioritySecurity', e)}
              role="slider"
              aria-label="Sicherheit"
              aria-valuenow={formData.prioritySecurity}
              aria-valuemin={0}
              aria-valuemax={100 - formData.priorityReturn}
              style={{ touchAction: 'none', userSelect: 'none' }}
            >
              <div className="h-full bg-[#0EB689] rounded-md transition-[width] duration-150 ease-out group-hover:brightness-110" style={{ width: `${formData.prioritySecurity}%` }} />
            </div>
            <span className="min-w-[34px] font-bold text-sm text-[#0EB689] text-right">{formData.prioritySecurity}%</span>
          </div>

          <div className="flex items-center gap-2.5 mb-0">
            <span className="min-w-[80px] font-semibold text-sm text-gray-800">Liquidität</span>
            <div
              className={`flex-1 max-w-[260px] h-2 rounded-md bg-[#E1E8ED] cursor-grab active:cursor-grabbing relative overflow-hidden transition-opacity group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onPointerDown={(e) => handlePointerDown('priorityLiquidity', e)}
              role="slider"
              aria-label="Liquidität"
              aria-valuenow={formData.priorityLiquidity}
              aria-valuemin={0}
              aria-valuemax={100 - formData.priorityReturn}
              style={{ touchAction: 'none', userSelect: 'none' }}
            >
              <div className="h-full bg-[#0EB689] rounded-md transition-[width] duration-150 ease-out group-hover:brightness-110" style={{ width: `${formData.priorityLiquidity}%` }} />
            </div>
            <span className="min-w-[34px] font-bold text-sm text-[#0EB689] text-right">{formData.priorityLiquidity}%</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="mt-2 w-full bg-[#0EB689] hover:bg-[#0c9d76] text-white font-bold py-3 px-6 rounded-full shadow-sm transition-all duration-200 ease-in-out hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed" 
          disabled={isLoading}
        >
          {isLoading ? 'Wird erstellt...' : 'Ergebnis anzeigen'}
        </button>
      </form>
    </>
  );
}

export default MoneyCompassForm;
