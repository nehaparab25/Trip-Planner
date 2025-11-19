import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicenameService {

  constructor(private http: HttpClient) { }


  // Returns an Observable so callers can use `.subscribe()`
  datastore(param: any): Observable<any> {
    const model = 'gemini-2.5-pro';

    // Build a clear prompt asking Gemini to return a JSON with the requested sections.
    const prompt = `You are a helpful travel planner. Given the user's inputs, return a JSON object with the following keys:
  - dayWisePlan: an array of day objects (dayNumber and activities list)
  - accommodationSuggestions: array of strings with suggestions
  - localFoodRecommendations: array of strings
  - packingChecklist: array of strings
  - travelSafetyTips: array of strings
  - estimatedCostBreakdown: object with keys (transportation, accommodation, food, activities, total)

Make the JSON machine-readable only (no extra explanation). User inputs: startDate: ${param.startDate}, endDate: ${param.endDate}, tripType: ${param.tripType}, destination: ${param.destination}, budget: ${param.budget}.`;

    const requestBody: any = {
      model,
      prompt,
      temperature: 0.2,
      maxOutputTokens: 800
    };

    const endpoint = (environment as any).geminiEndpoint;
    const apiKey = (environment as any).geminiApiKey;

    if (endpoint && apiKey) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // Many APIs expect Bearer tokens; if your provider uses a different scheme (e.g., ?key=), adjust accordingly.
        'Authorization': `Bearer ${apiKey}`
      });

      return this.http.post(endpoint, requestBody, { headers }).pipe(
        map((resp: any) => {
          // Attempt to find textual output and parse JSON if necessary
          // Different Gemini / GenAI endpoints return different shapes; try common patterns.
          try {
            // If the API returns a direct JSON object, return it.
            if (resp && typeof resp === 'object' && (resp.dayWisePlan || resp.daywisePlan || resp.estimatedCostBreakdown)) {
              return resp;
            }

            // Some APIs return text in resp.output[0].content or resp.candidates[0].output
            const candidateText = resp?.candidates?.[0]?.output || resp?.output?.[0]?.content || resp?.text || resp?.result;
            if (typeof candidateText === 'string') {
              return JSON.parse(candidateText);
            }

            return resp;
          } catch (e) {
            console.error('Failed to parse Gemini response as JSON', e);
            return { error: 'invalid_response', raw: resp };
          }
        }),
        catchError(err => {
          console.error('Gemini API error', err);
          return of({ error: true, message: 'Gemini API error', details: err });
        })
      );
    }

    // Fallback: return a mock structured response derived from inputs (useful for dev without API keys)
    const mock = {
      dayWisePlan: [
        { day: 1, activities: [ `Arrive at ${param.destination}`, 'Check into hotel', 'Light sightseeing' ] },
        { day: 2, activities: [ 'Full day exploring local highlights', 'Try recommended local foods' ] }
      ],
      accommodationSuggestions: [ 'Comfortable 3-star hotel near city center', 'Budget guesthouse with excellent reviews' ],
      localFoodRecommendations: [ 'Local specialty 1', 'Local specialty 2' ],
      packingChecklist: [ 'Travel documents', 'Appropriate clothing', 'Medications' ],
      travelSafetyTips: [ 'Keep copies of important documents', 'Use licensed taxis at night' ],
      estimatedCostBreakdown: { transportation: 200, accommodation: 400, food: 150, activities: 150, total: 900 }
    };

    return of(mock);
  }
}