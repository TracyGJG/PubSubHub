/*================================================
	PubSubHub: Publish and Subscribe exchange.

	Publishers:
		Issue data about a Topic to registered Subscribers.
	Subscribers:
		Register their interest in receiving data regarding 1 or more Topics.
	Topic:
		A Topic comprises a Data object and a list of Subscribers.
		When data is published to a Topic it is sent to all registered Subscribers.

--------------------------------------------------

subscribe(SUB, TOPIC_LIST, CALLBACK)
	Traverse each entry (TOPIC) in the TOPIC_LIST provided.
		Create the TOPIC if it does not already exist.
	Add the subscriber (CALLBACK) to the list on subscribers to to Topic, using the name SUB.
	If the is Data available for the Topic,
		invoke the Callback function to issue the Data to the subscriber.

unsubscribe(SUB, TOPIC_LIST)
	Traverse each entry (TOPIC) in the TOPIC_LIST provided.
		If the TOPIC exists and the subscriber (SUB) is listed,
			remove the entry from the list.

publish(TOPIC, DATA)
	Create the TOPIC if it does not already exist.
	Set the Topic's Data to the DATA to be published.
	If DATA has been supplied (not empty),
		traverse the list of subscribers and,
		invoke the Callback function to issue the Data to the subscriber.

================================================*/

const PubSubHub = (function () {
  'use strict';

  const objTopics = {};

  function PubSubHub_subscribe(pSubId, pTopics, pCallback) {
    let topic, topicIndex, topicLoop;

    if (!pSubId) {
      throw 'A Subscriber Id is required in order to Subscribe to a Topic.';
    }
    if (!pTopics || !pTopics.length) {
      throw 'At least one Topic is required in order to Subscribe.';
    }
    if (!pCallback || typeof pCallback !== 'function') {
      throw 'A Callback function is required in order to Subscribe to a Topic.';
    }
    for (topicLoop = pTopics.length; topicLoop; ) {
      topicIndex = pTopics[(topicLoop -= 1)];

      if (!!topicIndex) {
        topic = objTopics[topicIndex];
        if (!topic) {
          topic = objTopics[topicIndex] = {
            data: null,
            subscribers: {},
          };
        }
        if (!!pCallback) {
          topic.subscribers[pSubId] = pCallback;
          if (!!topic.data) {
            pCallback(pSubId, topicIndex, topic.data);
          }
        }
      } else {
        throw 'A named Topic is required in order to Subscribe.';
      }
    }
  }

  function PubSubHub_unsubscribe(pSubId, pTopics) {
    let topic, topicIndex, topicLoop;

    if (!pSubId) {
      throw 'A Subscriber Id is required in order to Subscribe to a Topic.';
    }
    if (!pTopics || !pTopics.length) {
      throw 'At least one Topic is required in order to Subscribe.';
    }
    for (topicLoop = pTopics.length; topicLoop; ) {
      topicIndex = pTopics[(topicLoop -= 1)];

      if (!!topicIndex) {
        topic = objTopics[topicIndex];
        if (!!objTopics[topicIndex].subscribers[pSubId]) {
          delete objTopics[topicIndex].subscribers[pSubId];
        }
      } else {
        throw 'A named Topic is required in order to Subscribe.';
      }
    }
  }

  function PubSubHub_publish(pTopic, pData) {
    if (!pTopic) {
      throw 'A Topic is required in order to Publish data.';
    }
    let topic = objTopics[pTopic],
      topicLoop;
    if (!topic) {
      topic = objTopics[pTopic] = { data: null, subscribers: {} };
    }
    topic.data = pData;
    if (!!pData) {
      for (topicLoop in topic.subscribers) {
        topic.subscribers[topicLoop](topicLoop, pTopic, pData);
      }
    }
  }

  /* Publish the interface to the API */
  return {
    subscribe: PubSubHub_subscribe,
    unsubscribe: PubSubHub_unsubscribe,
    publish: PubSubHub_publish,
  };
})();
