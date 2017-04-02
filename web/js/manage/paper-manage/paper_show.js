$(function(){

  //首先取到要渲染的id
  var paperId= $('.paper_sample').attr('id');

  //取到相应的json结构
  var paperStructureId=$('.paper_content').attr('id');

  var paper1=JSON.parse($('#'+paperStructureId).text());

   /*var item = {
     "flowable":false,
     "shuffle":true,
     "stem":"此处为试题题干内容，题干中可以包括图片、音频以及视频等多媒体。",
     "show-stem-length":false,
     "questions-num-limit":true,
     "pre-show":true,
     "questions": [
        {
          "type":"SingleChoice",
          "stem":"此处为单选小题题干，题干内容可以包括图片、音频以及视频等多媒体。",
          "options":[
            "单选小题选项内容",
            "单选小题选项内容",
            "单选小题选项内容",
            "单选小题选项内容"
            ]
          }
        ]
    }*/
    Array.prototype.shuffle = function () {
			var newArr = [];
			for (var i = 0, len = this.length; i < len; i++) {
				newArr.push(this[i]);
			}
			for (var i = 0, newLen = newArr.length; i < newLen; i++) {
				var random = Math.floor(Math.random() * newLen);
				var temp = newArr[random];
				newArr[random] = newArr[i];
				newArr[i] = temp;
			}
			//console.log(newArr);
			return newArr;
		}

  //试卷paper
var capitalLetterArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

		var PartOrderNum = 1;
		var QuestionOrderNum = 1;

		window.answer = localStorage['answer'] ? JSON.parse(localStorage['answer']) : {};
		
		var paper={
		     "question-option-shuffle": true,
		     "groups": [
		       {
		         "duration": 1200,
		         "parts": [
		           {
		             "name": "Writing",
		             "flowable": false,
		             "duration": 20,
		             "sections": [
		               {
		                 "direction": "direction",
		                 "shuffle": "section内的item顺序是否乱序",
		                 "items": [
		                   {
		                     "id": 121,
		                     "stem": "For this part, you are allowed 30 minutes to write an essay based on the picture below.You should start your essay with a brief description of the picture and comment on parents’ role in their children’s growth. You should write at least 150 words but no more than 180 words.",
		                     "questions": [
		                       {
		                         "type": "SimpleAnswer",
		                         "strict": false,
		                         "reference-answer": "Parents’ role in their children’s growth <br>As is prescribed in the picture, the girl told her mother, “Good news mom! I was accepted to the college of your choice.” We can infer that the mom chooses college for her child, but should the parents make such decision for their children? As far as I concerned, parents can give advice for their children instead of making decisions for them. <br>Firstly, parents always want to give their children the best, however, they cannot completely understand their children’s interest and can’t sure what the most suitable is to their children. They just give their children what they consider the best, regardless of what their children want and what they like. So the best way to show your love is to respect children’s choice. Secondly, the children should responsible for their own life. Parents can company their children decades of years, but they cannot company their children’s whole life. Parents can give their children advice, but teach their children to be independent is more important in their growth. <br>To sum up, parents can give their children advice,but they should respect their children’s choice. After all, children will grow up one day, and they must learn how to live independent and be responsible for their own life.",
		                         "answer-analysis": "参考答案解析"
		                       }
		                     ]
		                   }
		                 ]
		               }
		             ]
		           },
		           {
		             "name": "Listening",
		             "flowable": true,
		             "duration": 20,
		             "sections": [
		               {
		                 "direction": "In this section, you will hear 8 short conversations and 2 long conversations. At the end of each conversation, one or more questions will be asked about what was said. Both the conversation and the questions will be spoken only once. After each question there will be a pause. During the pause, you must read the four choices marked A), B), C) and D), and decide which is the best answer. Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre",
		                 "shuffle": false,
		                 "items": [
		                   {
		                       "id": 1,
		                     "stem": "试题题干",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "options": [
		                             "The man is not good at balancing his budget.",
		                             "She will go purchase the gift herself.",
		                             "The gift should not be too expensive.",
		                             "They are gonging to Jane's house-warming party."
		                           ],
		                           "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "options": [
		                             "1111111The man is not good at balancing his budget.",
		                             "111111She will go purchase the gift herself.",
		                             "11111111The gift should not be too expensive.",
		                             "111111They are gonging to Jane's house-warming party."
		                           ],
		                           "strict": true,
		                         "reference-answer": 2,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 2,
		                     "stem": "试题题干",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "options": [
		                           "The man is not good at balancing his budget.",
		                             "She will go purchase the gift herself.",
		                             "The gift should not be too expensive.",
		                             "They are gonging to Jane's house-warming party."
		                           ],
		                           "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 3,
		                     "stem": "试题题干",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "options": [
		                           "The man is not good at balancing his budget.",
		                             "She will go purchase the gift herself.",
		                             "The gift should not be too expensive.",
		                             "They are gonging to Jane's house-warming party."
		                           ],
		                           "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 4,
		                     "stem": "试题题干",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "options": [
		                           "The man is not good at balancing his budget.",
		                             "She will go purchase the gift herself.",
		                             "The gift should not be too expensive.",
		                             "They are gonging to Jane's house-warming party."
		                           ],
		                           "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 5,
		                     "stem": "试题题干",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "options": [
		                           "The man is not good at balancing his budget.",
		                             "She will go purchase the gift herself.",
		                             "The gift should not be too expensive.",
		                             "They are gonging to Jane's house-warming party."
		                           ],
		                           "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 6,
		                     "stem": "试题题干",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "options": [
		                           "The man is not good at balancing his budget.",
		                             "She will go purchase the gift herself.",
		                             "The gift should not be too expensive.",
		                             "They are gonging to Jane's house-warming party."
		                           ],
		                           "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 7,
		                     "stem": "试题题干",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "options": [
		                           "The man is not good at balancing his budget.",
		                             "She will go purchase the gift herself.",
		                             "The gift should not be too expensive.",
		                             "They are gonging to Jane's house-warming party."
		                           ],
		                           "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 8,
		                     "stem": "试题题干",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "options": [
		                           "The man is not good at balancing his budget.",
		                             "She will go purchase the gift herself.",
		                             "The gift should not be too expensive.",
		                             "They are gonging to Jane's house-warming party."
		                           ],
		                           "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 9,
		                     "stem": "Followed 3 questions are based on the long conversation you have just heard.",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "He teaches in a law school.",
		                             "He loves classical music.",
		                             "He is a diplomat.",
		                             "He is a wonderful lecturer."
		                           ],
		                           "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "Went to see a play.",
		                             "Watched a soccer game.",
		                             "Took some photos.",
		                             "Attended a dance."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                           "She decided to get married in three years.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her father said she could marry Eric right away."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 10,
		                     "stem": "Followed 3 questions are based on the long conversation you have just heard.",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "He teaches in a law school.",
		                             "He loves classical music.",
		                             "He is a diplomat.",
		                             "He is a wonderful lecturer."
		                           ],
		                           "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "Went to see a play.",
		                             "Watched a soccer game.",
		                             "Took some photos.",
		                             "Attended a dance."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                           "She decided to get married in three years.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her father said she could marry Eric right away."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       }
		                     ]
		                   }
		                 ]
		               },
		               {
		                 "direction": "In this section, you will hear 3 short passages. At the end of each passage, you will hear some questions. Both the passage and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre",
		                 "shuffle": false,
		                 "items": [
		                   {
		                       "id": 12,
		                     "stem": "Followed 3 questions are based on the passage you have just heard.",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "He teaches in a law school.",
		                             "He loves classical music.",
		                             "He is a diplomat.",
		                             "He is a wonderful lecturer."
		                           ],
		                           "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
															"type": "MultipleChoice",
															"shuffle": true, 				
															"options": [		
																"abolish",
																"accomplish",
																"distinguish",
																"establish"
															],
															"strict": true,	
															"reference-answer": [2,3],
															"answer-analysis": "参考答案解析"
													 },
													 {
														"type": "TrueOrFalse",
														"stem": "James Chaney, Andrew Goodman and Michael Schwerner were all white volunteers.",
														"strict": true,	
														"reference-answer": 1,		
														"answer-analysis": "参考答案解析"
													 },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "Went to see a play.",
		                             "Watched a soccer game.",
		                             "Took some photos.",
		                             "Attended a dance."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                           "She decided to get married in three years.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her father said she could marry Eric right away."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       }
		                     ]
		                   },
		                   {
		                       "id": 11,
		                     "stem": "Followed 3 questions are based on the passage you have just heard.",
		                     "questions":[
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "He teaches in a law school.",
		                             "He loves classical music.",
		                             "He is a diplomat.",
		                             "He is a wonderful lecturer."
		                           ],
		                           "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "Went to see a play.",
		                             "Watched a soccer game.",
		                             "Took some photos.",
		                             "Attended a dance."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                           "She decided to get married in three years.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her father said she could marry Eric right away."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       }
		                     ]
		                   },{
		                       "id": 11,
		                     "stem": "Followed 3 questions are based on the passage you have just heard.",
		                     "questions": [
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "He teaches in a law school.",
		                             "He loves classical music.",
		                             "He is a diplomat.",
		                             "He is a wonderful lecturer."
		                           ],
		                           "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                             "Went to see a play.",
		                             "Watched a soccer game.",
		                             "Took some photos.",
		                             "Attended a dance."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "pause": 3,
		                         "options": [
		                           "She decided to get married in three years.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her mother objected to Eric’s flying lessons.",
		                             "Her father said she could marry Eric right away."
		                           ],
		                         "strict": true,
		                         "reference-answer": 1,
		                         "answer-analysis": "参考答案解析"
		                       }
		                     ]
		                   }
		                 ]
		               },
		               {
		                 "direction": "In the section, you will hear a passage three times. When the passage is read for the first time, you should listen carefully for its general idea. When the passage is read for the second time, you are required to fill in the blanks with the exact words you have just heard. Finally, when the passage is read for the third time, you should check what you have written.",
		                 "shuffle": false,
		                 "items": [
		                   {
		                     "id": 13,
		                     "stem": "Stunt people(替身演员) are not movie stars, but they are the hidden heroes of many movies.  <br>They were around long before films. Even Shakespeare may have used them in fight scenes. To be good, a fight scene has to look real. Punches must ( 1 ) enemies' jaws. Sword fights must be fought with ( 2 ) swords. Several actors are usually in a fight scene. Their moves must be set up so that no one gets hurt. It is almost like planning a dance performance.  <br>If a movie scene is dangerous, stun people usually ( 3 ) the stars. You may think you see Tom Cruise running along the top of a train. But it is ( 4 ) his stunt double. Stunt people must ( 5 ) the stars they stand in for. Their height and build should be about the same. But when close-ups are needed, the film ( 6 ) the star.  <br>Some stunt people ( 7 ) in certain kinds of scenes. For instance, a stunt woman named Jan Davis does all kinds of jumps. She has leapt from planes and even off the top of a waterfall. Each jump required careful planning and expert ( 8 ) .  <br>Yakima Canutt was a famous cowboy stunt man. Among other stunts, he could jump from a second story window onto a horse's back. He ( 9 ) the famous trick of sliding under a moving stagecoach. Canutt also ( 10 ) a new way to make a punch look real. He was the only stunt man ever to get an Oscar.",
		                     "questions": [
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "apple",
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "sharp",
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "iphone",
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "meizu",
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "resemble",
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "focuses",
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "specialize",
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "blackberry",
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "invented",
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "figured out",
		                         "answer-analysis": "参考答案解析"
		                       }
		                     ]
		                   }
		                 ]
		               }
		             ]
		           }
		         ]
		       },
		       {
		         "duration": 40,
		         "parts": [
		           {
		             "name": "ReadingComprehension",
		             "flowable": false,
		             "duration": 20,
		             "sections": [
		               {
		                 "direction": "In this section, there is a passage with ten blanks. You are required to select one word for each blank from a list of choices given in a word bank following the passage. Read the passage through carefully before making your choices. Each choice in the bank is identified by a letter. Please mark the corresponding letter on Answer Sheet 2 with a single line through the centre. You may not use any of the words in the bank more than once.",
		                 "shuffle": false,
		                 "items": [
		                   {
		                     "id": 14,
		                     "stem": "Global warming is a trend toward warmer conditions around the world. Part of the warming is natural; we have experienced a 20,000 -year -long warming as the last ice age ended and the ice ( 1 ) away. However, we have already reached temperatures that are in ( 2 ) with other minimum-ice periods, so continued warming is likely not natural. We are ( 3 ) to a predicted worldwide increase in temperatures ( 4 ) between 1℃ and 6℃ over the next 100 years. The warming will be more ( 5 ) in some areas, less in others, and some places may even cool off. Likewise, the ( 6 ) of this warming will be very different depending on where you are—coastal areas must worry about rising sea levels, while Siberia and northern Canada may become more habitable (宜居的) and ( 7 ) for humans than these areas are now. <br>The fact remains, however, that it will likely get warmer, on ( 8 ) , everywhere. Scientists are in general agreement that the warmer conditions we have been experiencing are at least in part the result of a human-induced global warming trend. Some scientists ( 9 ) that the changes we are seeing fall within the range of random (无规律的) variation—some years are cold, others warm, and we have just had an unremarkable string of warm years ( 10 ) —but that is becoming an increasingly rare interpretation in the face of continued and increasing warm conditions.",
		                     "length":355,
		                     "options": [
		                       "appealing",
		                       "average",
		                       "contributing",
		                       "dramatic",
		                       "frequently",
		                       "impact",
		                       "line",
		                       "maintain",
		                       "melted",
		                       "persist",
		                       "ranging",
		                       "recently",
		                       "resolved",
		                       "sensible",
		                       "shock"
		                     ],
		                     "questions": [
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",
		                         "strict": true,
		                         "reference-answer": "contributing",
		                         "answer-analysisi": "答案解析"
		                       }
		                     ]
		                   }
		                 ]
		               },
		               {
		                 "direction": "Directions: In this section, you are going to read a passage with ten statements attached to it. Each statement contains information given in one of the paragraphs Identify the paragraph from which the information is derived. You may choose a paragraph more than once. Each paragraph is marked with a letter. Answer the questions by marking the corresponding letter on Answer Sheet 2.",
		                 "shuffle": false,
		                 "items": [
		                   {
		                     "id": 15,             
		                     "stem": " The End of the Book?                      [A] Amazon, by far the largest bookseller in the country, reported on May 19 that it is now selling more books in its electronic Kindle format than in the old paper-and-ink format. That is remarkable, considering that the Kindle has only been around for four years. E-books now account for 14 percent of all book sales in the country and are increasing far faster than overall book sales. E-book sales are up 146 percent over last year, while hardback sales increased 6 percent and paperbacks decreased 8 percent.                      [B] Does this spell the doom of the physical book? Certainly not immediately, and perhaps not at all. What it does mean is that the book business will go through a transformation in the next decade or so more profound than any it has seen since Gutenberg introduced printing from moveable type in the 1450s.                      [C] Physical books will surely become much rarer in the marketplace. Mass market paperbacks, which have been declining for years anyway, will probably disappear, as will hardbacks for mysteries, thrillers, “romance fiction,” etc. Such books, which only rarely end up in permanent collections, either private or public, will probably only be available as e-books within a few years. Hardback and trade paperbacks for “serious” nonfiction and fiction will surely last longer. Perhaps it will become the mark of an author to reckon with that he or she is still published in hard copy.                      [D] As for children’s books, who knows? Children’s books are like dog food in that the purchasers are not the consumers, so the market (and the marketing) is inherently strange.                      [E] For clues to the book’s future, let’s look at some examples of technological change and see what happened to the old technology.                      [F] One technology replaces another only because the new technology is better, cheaper, or both. The greater the difference, the sooner and more thoroughly the new technology replaces the old. Printing with moveable type on paper dramatically reduced the cost of producing a book compared with the old-fashioned ones handwritten on vellum, which comes from sheepskin. A Bible—to be sure, a long book—required vellum made from 300 sheepskins and countless man-hours of labor. Before printing arrived, a Bible cost more than a middle-class house. There were perhaps 50,000 books in all of Europe in 1450. By 1500 there were 10 million.                      [G] But while printing quickly caused the hand written book to die out, handwriting lingered on (继续存在) well into the 16th century. Very special books are still occasionally produced on vellum, but they are one-of-a-kind show pieces.                      [H]Sometimes a new technology doesn’t drive the old one out, but only parts of it while forcing the rest to evolve. The movies were widely predicted to drive live theater out of the marketplace, but they didn’t, because theater turned out to have qualities movies could not reproduce. Equally, TV was supposed to replace movies but, again, did not.                      [I] Movies did, however, fatally impact some parts of live theater. And while TV didn’t kill movies, it did kill second-rate pictures, shorts, and cartoons.                      [J] Nor did TV kill radio. Comedy and drama shows (“Jack Benny,” “Amos and Andy,” “The Shadow”) all migrated to television. But because you can’t drive a car and watch television at the same time, rush hour became radio’s prime, while music, talk, and news radio greatly enlarged their audiences. Radio is today a very different business than in the late 1940s and a much larger one.                      [K] Sometimes old technology lingers for centuries because of its symbolic power. Mounted cavalry (骑兵) replaced the chariot (二轮战车) on the battlefield around 1000 BC. But chariots maintained their place in parades and triumphs right up until the end of the Roman Empire 1,500 years later. The sword hasn’t had a military function for a hundred years, but is still part of an officer’s full-dress uniform, precisely because a sword always symbolized “an officer and a gentleman.”                      [L] Sometimes new technology is a little cranky (不稳定的) at first. Television repairman was a common occupation in the 1950s, for instance. And so the old technology remains as a backup. Steamships captured the North Atlantic passenger business from sail in the 1840s because of its much greater speed. But steamships didn’t lose their sails until the 1880s, because early marine engines had a nasty habit of breaking down. Until ships became large enough (and engines small enough) to mount two engines side by side, they needed to keep sails. (The high cost of steam and the lesser need for speed kept the majority of the world’s ocean freight moving by sail until the early years of the 20th century.)                      [M] Then there is the fireplace. Central heating was present in every upper-and middle-class home by the second half of the 19th century. But functioning fireplaces remain to this day a powerful selling point in a house or apartment. I suspect the reason is a deep-rooted love of the fire. Fire was one of the earliest major technological advances for humankind, providing heat, protection, and cooked food (which is much easier to cat and digest). Human control of fire goes back far enough (over a million years) that evolution could have produced a genetic leaning towards fire as a central aspect of human life.                      [N] Books—especially books the average person could afford—haven’t been around long enough to produce evolutionary change in humans. But they have a powerful hold on many people nonetheless, a hold extending far beyond their literary content. At their best, they are works of art and there is a tactile（触觉的）pleasure in books necessarily lost in e-book versions. The ability to quickly thumb through pages is also lost. And a room with books in it induces, at least in some, a feeling not dissimilar to that of a fire in the fireplace on a cold winter’s night.                      [O] For these reasons I think physical books will have a longer existence as a commercial product than some currently predict. Like swords, books have symbolic power. Like fireplaces, they induce a sense of comfort and warmth. And, perhaps, similar to sails, they make a useful back-up for when the lights go out.",
		                     "length":755,
		                     "questions": [
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "Authors still published in printed versions will be considered important ones.", 
		                         "strict": true,
		                         "reference-answer": "F",    
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "Some people are still in favor of printed books because of the sense of touch they can provide.", 
		                         "strict": true,
		                         "reference-answer": "B",    
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "The radio business has changed greatly and now attracts more listeners.",  
		                         "strict": true,
		                         "reference-answer": "C",    
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "Contrary to many people’s prediction of its death, the film industry survived.", 
		                         "strict": true,
		                         "reference-answer": "D",    
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "Remarkable changes have taken place in the book business.",  
		                         "strict": true,
		                         "reference-answer": "H",    
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "Old technology sometimes continues to exist because of its reliability.",  
		                         "strict": true,
		                         "reference-answer": "A",    
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "The increase of e-book sales will force the book business to make changes not seen for centuries.", 
		                         "strict": true,
		                         "reference-answer": "O",    
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "A new technology is unlikely to take the place of an old one without a clear advantage.",  
		                         "strict": true,
		                         "reference-answer": "N",    
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "Paperbacks of popular literature are more likely to be replaced by e-books.",  
		                         "strict": true,
		                         "reference-answer": "M",    
		                         "answer-analysis": "参考答案解析"
		                       },
		                       {
		                         "type": "BlankFilling",   
		                         "stem": "A house with a fireplace has a stronger appeal to buyers.",  
		                         "strict": true,
		                         "reference-answer": "I",    
		                         "answer-analysis": "参考答案解析"
		                       }
		                     ]
		                   }
		                 ]
		               },
		               {
		                 "direction": "There are 2 passages in this section. Each passage is followed by some questions or unfinished statements. For each of them there are four choices marked A), B), C) and D). You should decide on the best choice and mark the corresponding letter on Answer Sheet 2 with a single line through the centre.",
		                 "shuffle": true,
		                 "items": [
		                   {
		                     "id": 15,
		                     "stem": "Energy independence. It has a nice ring to it. Doesn’t it? If you think so, you’re not alone, because energy independence has been the dream of American president for decades, and never more so than in the past few years, when the most recent oil price shock has been partly responsible for kicking off the great recession. <br>“Energy independence” and its rhetorical (修辞的) companion “energy security” are, however, slippery concepts that are rarely though through. What is it we want independence from, exactly? <br>Most people would probably say that they want to be independent from imported oil. But there are reasons that we buy all that old from elsewhere. <br>The first reason is that we need it to keep our economy running. Yes, there is a trickle(涓涓细流)of biofuel(生物燃料)available, and more may become available, but most biofuels cause economic waste and environmental destruction. <br>Second, Americans have basically decided that they don’t really want to produce all their own oil. They value the environmental quality they preserve over their oil imports from abroad. Vast areas of the United States are off-limits to oil exploration and production in the name of environmental protection. To what extent are Americans really willing to endure the environmental impacts of domestic energy production in order to cut back imports? <br>Third, there are benefits to trade. It allows for economic efficiency, and when we buy things from places that have lower production costs than we do, we benefit. And although you don’t read about this much, the United States is also a large exporter of oil products, selling about 2 million barrels of petroleum products per day to about 90 countries. <br>There is no question that the United States imports a great deal of energy and, in fact, relies on that steady flow to maintain its economy. When that flow is interrupted, we feel the pain in short supplies and higher prices, At the same time, we derive massive economic benefits when we buy the most affordable energy on the world market and when we engage in energy trade around the world.",
		                     "length":980,
		                     "questions": [
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "What does the author say about energy independence for America?",
		                         "options": [
		                           "It sounds very attractive.",
		                           "It ensures national security.",
		                           "It will bring oil prices down.",
		                           "It has long been everyone’s dream."
		                         ],
		                         "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "What does the author think of biofuels?",
		                         "options": [
		                           "They keep America’s economy running healthily.",
		                           "They prove to be a good alternative to petroleum.",
		                           "They do not provide a sustainable energy supply.",
		                           "They cause serious damage to the environment."
		                         ],
		                         "strict": true,
		                         "reference-answer": 2,
		                         "answer-analysis": "答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "Why does America rely heavily on oil imports?",
		                         "options": [
		                           "It wants to expand its storage of crude oil.",
		                           "Its own oil reserves are quickly running out.",
		                           "It wants to keep its own environment intact.",
		                           "Its own oil production falls short of demand."
		                         ],
		                         "strict": true,
		                         "reference-answer": 3,
		                         "answer-analysis": "答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "What does the author say about oil trade?",
		                         "options": [
		                           "It proves profitable to both sides.",
		                           "It improves economic efficiency.",
		                           "It makes for economic prosperity.",
		                           "It saves the cost of oil exploration."
		                         ],
		                         "strict": true,
		                         "reference-answer": 3,
		                         "answer-analysis": "答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "What is the author’s purpose in writing the passage?",
		                         "options": [
		                           "To justify America’s dependence on oil imports.",
		                           "To arouse Americans’ awareness of the energy crisis.",
		                           "To stress the importance of energy conservation.",
		                           "To explain the increase of international oil trade."
		                         ],
		                         "strict": true,
		                         "reference-answer": 3,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   },
		                   {
		                     "id": 16,
		                     "stem": "Energy independence. It has a nice ring to it. Doesn’t it? If you think so, you’re not alone, because energy independence has been the dream of American president for decades, and never more so than in the past few years, when the most recent oil price shock has been partly responsible for kicking off the great recession. <br>“Energy independence” and its rhetorical (修辞的) companion “energy security” are, however, slippery concepts that are rarely though through. What is it we want independence from, exactly? <br>Most people would probably say that they want to be independent from imported oil. But there are reasons that we buy all that old from elsewhere. <br>The first reason is that we need it to keep our economy running. Yes, there is a trickle(涓涓细流)of biofuel(生物燃料)available, and more may become available, but most biofuels cause economic waste and environmental destruction. <br>Second, Americans have basically decided that they don’t really want to produce all their own oil. They value the environmental quality they preserve over their oil imports from abroad. Vast areas of the United States are off-limits to oil exploration and production in the name of environmental protection. To what extent are Americans really willing to endure the environmental impacts of domestic energy production in order to cut back imports? <br>Third, there are benefits to trade. It allows for economic efficiency, and when we buy things from places that have lower production costs than we do, we benefit. And although you don’t read about this much, the United States is also a large exporter of oil products, selling about 2 million barrels of petroleum products per day to about 90 countries. <br>There is no question that the United States imports a great deal of energy and, in fact, relies on that steady flow to maintain its economy. When that flow is interrupted, we feel the pain in short supplies and higher prices, At the same time, we derive massive economic benefits when we buy the most affordable energy on the world market and when we engage in energy trade around the world.",
		                     "length":980,
		                     "questions": [
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "What does the author say about energy independence for America?",
		                         "options": [
		                           "It sounds very attractive.",
		                           "It ensures national security.",
		                           "It will bring oil prices down.",
		                           "It has long been everyone’s dream."
		                         ],
		                         "strict": true,
		                         "reference-answer": 0,
		                         "answer-analysis": "答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "What does the author think of biofuels?",
		                         "options": [
		                           "They keep America’s economy running healthily.",
		                           "They prove to be a good alternative to petroleum.",
		                           "They do not provide a sustainable energy supply.",
		                           "They cause serious damage to the environment."
		                         ],
		                         "strict": true,
		                         "reference-answer": 2,
		                         "answer-analysis": "答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "Why does America rely heavily on oil imports?",
		                         "options": [
		                           "It wants to expand its storage of crude oil.",
		                           "Its own oil reserves are quickly running out.",
		                           "It wants to keep its own environment intact.",
		                           "Its own oil production falls short of demand."
		                         ],
		                         "strict": true,
		                         "reference-answer": 3,
		                         "answer-analysis": "答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "What does the author say about oil trade?",
		                         "options": [
		                           "It proves profitable to both sides.",
		                           "It improves economic efficiency.",
		                           "It makes for economic prosperity.",
		                           "It saves the cost of oil exploration."
		                         ],
		                         "strict": true,
		                         "reference-answer": 3,
		                         "answer-analysis": "答案解析"
		                       },
		                       {
		                         "type": "SingleChoice",
		                         "shuffle": true,
		                         "stem": "What is the author’s purpose in writing the passage?",
		                         "options": [
		                           "To justify America’s dependence on oil imports.",
		                           "To arouse Americans’ awareness of the energy crisis.",
		                           "To stress the importance of energy conservation.",
		                           "To explain the increase of international oil trade."
		                         ],
		                         "strict": true,
		                         "reference-answer": 3,
		                         "answer-analysis": "答案解析"
		                       }
		                     ]
		                   }
		                 ]
		               }
		             ]
		           },
		           {
		             "name": "Translation",
		             "flowable": false,
		             "duration": 20,
		             "sections": [
		               {
		                 "direction": "For this part, you are allowed 30 minutes to translate a passage from Chinese into English. You should write your answer on Answer Sheet 2",
		                 "shuffle": true,
		                 "items": [
		                   {
		                     "id": 17,             
		                     "stem": "为了促进教育公平，中国已投入360亿元，用于改善农村地区教育设施和中强中西部地区农村义务教育（compulsory education）。这些资金用于改善教学设施、购买书籍，使16万多所中小学受益。资金还用于购置音乐和绘画器材。现在农村和山区的儿童可以与沿海城市的儿童一样上音乐和绘画课。一些为接受更好教育而转往城市上学的学生如今又回到了本地农村学校就读。",
		                     "questions": [      
		                       {
		                         "type": "SimpleAnswer",   
		                         "strict": false,
		                         "reference-answer": "To the best of my knowledge, education plays a decisive role in the development of society. ",   
		                         "answer-analysis": "无"
		                       }
		                     ]
		                   },
		                   {
		                     "id": 18,             
		                     "stem": "为了促进教育公平，中国已投入360亿元，用于改善农村地区教育设施和中强中西部地区农村义务教育（compulsory education）。这些资金用于改善教学设施、购买书籍，使16万多所中小学受益。资金还用于购置音乐和绘画器材。现在农村和山区的儿童可以与沿海城市的儿童一样上音乐和绘画课。一些为接受更好教育而转往城市上学的学生如今又回到了本地农村学校就读。",
		                     "questions": [      
		                       {
		                         "type": "SimpleAnswer",   
		                         "strict": false,
		                         "reference-answer": "To the best of my knowledge, education plays a decisive role in the development of society. ",   
		                         "answer-analysis": "无"
		                       }
		                     ]
		                   },
		                   {
		                     "id": 19,             
		                     "stem": "为了促进教育公平，中国已投入360亿元，用于改善农村地区教育设施和中强中西部地区农村义务教育（compulsory education）。这些资金用于改善教学设施、购买书籍，使16万多所中小学受益。资金还用于购置音乐和绘画器材。现在农村和山区的儿童可以与沿海城市的儿童一样上音乐和绘画课。一些为接受更好教育而转往城市上学的学生如今又回到了本地农村学校就读。",
		                     "questions": [      
		                       {
		                         "type": "SimpleAnswer",   
		                         "strict": false,
		                         "reference-answer": "To the best of my knowledge, education plays a decisive role in the development of society. ",   
		                         "answer-analysis": "无"
		                       }
		                     ]
		                   }
		                 ]
		               }
		             ]
		           }
		         ]
		       }
		     ]
		   }


		console.log(paper1);
		console.log(paper);
		

		   //倒计时组件
		var RestTime = React.createClass({
			getInitialState: function() {
				var rest_time = this.props.restTime;
				return {
					rest_time: rest_time
				};
			},
			generateHMS: function() {
				var self = this;
				var temp_hours = Math.floor( self.state.rest_time / 3600 );
				var hours = temp_hours < 10 ? '0' + temp_hours : temp_hours;
				var temp_minutes = Math.floor( (self.state.rest_time - parseInt(hours) * 3600) / 60 );
				var minutes = temp_minutes < 10 ? '0' + temp_minutes : temp_minutes;
				var temp_seconds = Math.floor( self.state.rest_time - temp_hours * 3600 - temp_minutes * 60 );
				var seconds = temp_seconds < 10 ? '0' + temp_seconds : temp_seconds;
				self.props.restTimeUpdate(self.state.rest_time - 1);
				self.setState({
					rest_time: self.state.rest_time - 1,
					hours: hours,
					minutes: minutes,
					seconds: seconds
				});
			},
			componentDidMount: function() {
				var self = this;
				this.generateHMS();
				this.__interval = setInterval(function(){
					self.generateHMS();
				}, 1000);
			},
			render: function() {
				return (
					<div>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</div>
				);
			}
		});
		
		//小题Question中的答题区域部分————单选题
		var SingleChoice = React.createClass({
			handleChange: function(event) {
			console.log(newValue);
				var question_id = this.props.questionId;
				var newValue = event.target.checked ? event.target.value : '';
				
				answer[question_id] = newValue;
				// 	//将答案存入localstorage  
				localStorage.setItem('answer', JSON.stringify(answer));				
			},
			render: function() {
				var self = this;
				var options = this.props.options;
				var question_id = this.props.questionId;
				var show_option = this.props.showOption;
				var answer_area = [];
				var question_answer = answer[question_id] || '';

				var answer_area = options.map(function(option, i, a) {
					return (
						<label className={'question-option ' + ( show_option ? 'block' : 'inline' )}>
							<input type="radio" name={question_id} value={option} defaultChecked={question_answer == option} onChange={self.handleChange} />
							<span className={'option' + ( show_option ? ' show-option' : ' hide-option' )}>
								<span className="option-content">{show_option ? option : ''}</span>
							</span>
						</label>
					)
				});
				/****************选项是否打乱顺序尚未做处理*********************/
				return (
					<div className="answer-area">
						{show_option ? answer_area.shuffle() : answer_area}
					</div>
				)
			}
		});
		//多选题
		var MultipleChoice = React.createClass({
			handleChange: function(event) {
				var question_id = this.props.questionId;
				var chk_value = [];
				var referenceAnswer = '';
				$('input[name='+question_id+']:checked').each(function() {
					chk_value.push($(this).attr('value'));
				});
				referenceAnswer = chk_value.join(',');
				answer[question_id] = referenceAnswer;
				//console.log(referenceAnswer);
				localStorage.setItem('answer', JSON.stringify(answer));				
			},
			render: function() {
				var self = this;
				var options = this.props.options;
				var show_option = this.props.showOption;
				var question_id = this.props.questionId;
				var answer_area = [];
				var question_answer = answer[question_id] || '';
				var answers = question_answer.split(',');
                answer_area = options.map(function(option, i, a) {
                    return(
                        <label className={'question-option block'}>
                            <input type="checkbox" name={question_id} value={option} defaultChecked={($.inArray(option, answers))>=0 ? true : false} onChange={self.handleChange} />
                            <span className={'option show-option'}>
                            <span className="option-content">{option}</span>
                            </span>
                        </label>
                    )
                });
				/****************选项是否打乱顺序尚未做处理*********************/
				return (
					<div className="answer-area">
						{answer_area}
					</div>
				)
			}
		});
		//判断题
		//判断题
		var TrueOrFalse = React.createClass({
			handleChange: function(event) {
				var question_id = this.props.questionId;
				var newValue = event.target.checked ? event.target.value : '';
				answer[question_id] = newValue;
				// 	//将答案存入localstorage  
				localStorage.setItem('answer', JSON.stringify(answer));				
			},
			render: function() {
				var self = this;
				var options = this.props.options;
				var question_id = this.props.questionId;
				var show_option = this.props.showOption;
				var answer_area = [];
				var question_answer = answer[question_id] || '';
				var values = ["T","F"];
				answer_area = values.map(function(value, i, a) {
                    return(
                        <label className={'question-option inline'}>
                            <input type="radio" name={question_id} value={value} defaultChecked={question_answer == value} onChange={self.handleChange} />
                            <span className={'option show-option'} value={value == "T" ? "T" : "F"}>
                            <span className="option-content">{value == "T" ? "T" : "F"}</span>
                            </span>
                        </label>
                    )
                });
				/****************选项是否打乱顺序尚未做处理*********************/
				return (
					<div className="answer-area">
						{answer_area}
					</div>
				)
			}
		});
		//小题Question中的答题区域部分————填空题
		var BlankFilling = React.createClass({
			handleChange: function(event) {
				var question_id = this.props.questionId;
				var newValue = event.target.value;
				answer[question_id] = newValue;
				// 	//将答案存入localstorage  
				localStorage.setItem('answer', JSON.stringify(answer));
			},
			render: function() {
				var question_id = this.props.questionId;
				var question_answer = answer[question_id] || '';
				var answer_area = <input type="text" placeholder="请输入答案" defaultValue={question_answer} onChange={this.handleChange} />;
				return (
					<div className="answer-area">
						{answer_area}
					</div>
				)
			}
		});

		//小题Question中的答题区域部分————简答题
		var SimpleAnswer = React.createClass({
			handleChange: function(event) {
				var question_id = this.props.questionId;
				var newValue = event.target.value;
				answer[question_id] = newValue;
				// 	//将答案存入localstorage  
				localStorage.setItem('answer', JSON.stringify(answer));
			},
			render: function() {
				var question_id = this.props.questionId;
				var question_answer = answer[question_id] || '';
				var answer_area = <textarea placeholder="请输入答案" defaultValue={question_answer} onChange={this.handleChange}></textarea>;
				return (
					<div className="answer-area">
						{answer_area}
					</div>
				)
			}
		});

		//试题item中包含的小题Question
		var Question = React.createClass({
			render: function() {
				var item_options = this.props.itemOptions;
				var question = this.props.question;
				var id = this.props.id;
				var type = question.type;

				var question_stem = question.stem 
					? <div className="question-stem">{question.stem}</div> 
					: '';
				var answer_area;

				//当item_options存在时，小题默认为单选题
				if(item_options) {
					//展示选项时，是否展示选项内容
					var showOption = false;
					answer_area = <SingleChoice options={item_options} questionId={id} showOption={showOption} />
				}else {
				//当item_options不存在时，判断小题类型，再做相应处理
					if(type == "SingleChoice") {
						//展示选项时，是否展示选项内容
						var showOption = true;
 						answer_area = <SingleChoice options={question.options} questionId={id} showOption={showOption} />
					}else if(type == "SimpleAnswer") {
						answer_area = <SimpleAnswer questionId={id} />
					}else if(type == "BlankFilling") {
						answer_area = <BlankFilling questionId={id} />
					}else if(type == "MultipleChoice") {
						answer_area = <MultipleChoice options={question.options} questionId={id} />
					}else if(type == "TrueOrFalse") {
					    answer_area = <TrueOrFalse questionId={id} />
                    }
				}

				return (
					<div id={id} className="question">
						<div className="question-content">
							{question_stem}
							{answer_area}
						</div>
					</div>
				);
			}
		});

		//试题item内的questions
		var Questions = React.createClass({
			render: function() {
				var item_options = this.props.itemOptions;
				var questions = this.props.questions;
				var item_id = this.props.itemId;

				var questionsArr = questions.map(function( question, i, questions ){
					return (
						<Question question={question} itemOptions={item_options} id={item_id + '_' + i} />
					);
				});
				return (
					<div className="questions">
						{questionsArr}
					</div>
				);
			}
		});

		//试题item题干
		var ItemStem = React.createClass({
			render: function() {
				//题干的长度
				var length = this.props.length ? '(' + this.props.length + " words)" : "";
				//判断item的题干长度是否显示
				var show_length = this.props.showLength ? true : false;
				var stem = {
					'__html': this.props.stem + (show_length ? length : '')
				}
				return (
					React.createElement("div", null, 
						React.createElement("div", {className: "item-stem", dangerouslySetInnerHTML: stem})
					)
				);
			}
		}); 

		//试题item的options
		var ItemOptions = React.createClass({
			optionsToTableRows: function() {
				/*将item的options转化为表格的形式展示，该函数将options变为表格的rows*/
				var options = this.props.options;
				var tableRows = [];

				for( var i = 0, len = options.length; i < len; i = i + 2 ){
					var td2 = options[i+1] ? <td>{options[i+1]}</td> : '';
					var tempRow = 
						<tr>
							<td>{options[i]}</td>
							{td2}
						</tr>;
					tableRows.push(tempRow);
				}

				return tableRows;
			},
			render: function() {
				var options = this.props.options;
				return (
					<table className="table table-bordered table-striped table-condensed item-options">
						<tbody>
							{this.optionsToTableRows()}
						</tbody>
					</table>
				)
			}
		});

		//试题item框
		var Item  = React.createClass({
			render: function() {
				var item = this.props.item;

				//shuffle指定item的options是否打乱
				var shuffle = item.shuffle ? true : false;

				//因为item的options的顺序打乱，会关系到questions选项的打乱，所以item的options在这个地方做处理
				var options = item.options 
								? ( shuffle ? item.options.shuffle() : item.options ) 
								: ''; 

				//如果item选项存在，则插入ItemOptions
				var item_options = options ?　<ItemOptions options={options} /> : '';

				return (
					<div className="item">
						<ItemStem stem={item.stem} length={item.length} showLength={item.showLength} />
						{item_options}
						<Questions questions={item.questions} itemOptions={options} itemId={item.id} /> 
					</div>
				);
			}
		});

		//section中的items
		var Items = React.createClass({
			render: function() {
				var items = this.props.items;
				var itemsArr = items.map(function(item1, i, items) {
				var	item = JSON.parse(item1);//本来没有这句的，不知道在试卷添加试题的时候哪里除了问题，把item安按照字符串添加了，只能转一下
					return (
						<Item item={item} />
					);
				});
				return (
					<div className="items">
						{itemsArr}
					</div>
				)
			}
		});
 
		//section的direction区域
		var Direction = React.createClass({
			render: function() {
				var direction = this.props.direction;
				return (
					<div className="direction">
						<span className="title direction-title">Directions: </span>
						<span className="direction-content">{direction}</span>
					</div>
				)
			}
		});

		//section
		var Section = React.createClass({
			render: function() {
				var section = this.props.section;
				var direction = section.direction;
				var items = section.items;
				return (
					<div className="section">
						<Direction direction={direction} />
						<Items items={items} />
					</div>
				);

			}
		});

		//sections 
		var Sections = React.createClass({
			render: function() {
				var sections = this.props.sections;
				var sectionsArr = sections.map(function(section, i, sections) {
					return (
						<Section section={section} />
					);
				});
				return (
					<div className="sections">
						{sectionsArr}
					</div>
				);
			}
		});

		var Part = React.createClass({
			render: function() {
				var part = this.props.part;
				return (
					<div className="part">
						<div className="part-top title">
							<div className="part-duration">({part.duration} minutes)</div>
							<div className="part-name">{part.name}</div>
						</div>
						<Sections sections={part.sections} />
					</div>
				)
			}
		});

		var Parts = React.createClass({
			render: function() {
				var parts = this.props.parts;
				var partsArr = parts.map(function(part, i, parts){
					return (<Part part={part} />);
				});
				return (
					<div className="parts">
						{partsArr}
					</div>
				)
			}
		});

		var Group = React.createClass({
			render: function() {
				var group = this.props.group;
				var grouping = this.props.grouping;
				return (
					<div className={'group' + (grouping ? ' show' : '')}>
						<Parts parts={group.parts} />
					</div>
				)
			}
		});
		
		var Groups = React.createClass({
			getInitialState: function() {
				var grouping = localStorage['grouping'] ? localStorage['grouping'] : 0;
				var groups = this.props.groups;
				var group_len = groups.length ? groups.length : 1;
				//从下一个group算起剩余的所有时间
				var next_group_time = 0;
				for(var i = grouping + 1; i < group_len; i++){
					next_group_time += this.props.groups[i].duration;
				}
				return {
					group_len: group_len,
					grouping: grouping,
					next_group_time: next_group_time
				}
			},
			getNextGroupTime: function(grouping) {
				var next_group_time = 0;
				for(var i = grouping + 1; i < this.state.group_len; i++){
					next_group_time += this.props.groups[i].duration;
				}
				return next_group_time;
			},
			restTimeUpdate: function(rest_time) {
				//本地存储设置rest_time
				localStorage['rest_time'] = rest_time;
				if(rest_time <= this.state.next_group_time){
					var grouping = this.state.grouping + 1;
					var next_group_time = 0;
					if(grouping < this.state.group_len){
						var next_group_time = this.getNextGroupTime(grouping);
					}
					this.setState({
						grouping: grouping,
						next_group_time: next_group_time
					});
				}
				if(rest_time < 0){
					localStorage.clear();  
				}
			},
			componentDidMount: function() {
				var self = this;
				var groups = this.props.groups;
				var total_time = groups.reduce(function(a, b){
					return a['duration'] + b['duration'];
				});

				var rest_time = localStorage['rest_time'] || total_time;

				ReactDOM.render(
					<RestTime restTime={rest_time} restTimeUpdate={this.restTimeUpdate} />,
					document.getElementById('rest-time')
				);
			},
			render: function() {
				var self = this;
				var groups = this.props.groups;

				var groupsArr = groups.map(function(group, i, groups) {
					return (
						<Group group={group} grouping={self.state.grouping == i} />
					)
				});
				return (
					<div className="groups">
						{groupsArr}
					</div>
				)
			}
		});

		var Paper = React.createClass({
			render: function() {
				var paper = this.props.paper;

				return (
					<div className="paper">
						<Groups groups={paper.groups} />
					</div>
				)
			}
		});

		ReactDOM.render(
			<Paper paper={paper1} />,
			$('#content')[0]
		);
		
});