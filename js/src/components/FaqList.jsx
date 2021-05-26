import React, { useEffect, useState } from "react";

const FaqItem = ({drupal_internal__nid, title, field_answer}) => (
  <div class="card">
    <div class="card-header" id={`heading${drupal_internal__nid}`}>
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${drupal_internal__nid}`} aria-expanded="true" aria-controls={`collapse${drupal_internal__nid}`}>
          {title}
        </button>
      </h2>
    </div>
    <div id={`collapse${drupal_internal__nid}`} class="collapse" aria-labelledby={`heading${drupal_internal__nid}`} data-parent="#accordionBlock">
        <div class="card-body">   
          <div class="faq-answer" dangerouslySetInnerHTML={{__html: field_answer.processed}}></div>
      </div>
    </div>
  </div>
)

const NoData = () => (
  <div class="alert alert-warning" role="alert">No FAQs found.</div>
);

// Validate the json response
function isValidData(data) {
  if (data === null) {
    return false;
  }
  if (data.data === undefined ||
    data.data === null ||
    data.data.length === 0 ) {
    return false;
  }
  return true;
}

const FaqList = () => {
  //Set the content and fliter variables to state
  const [content, setContent] = useState(false);
  const [filter, setFilter] = useState(null);

  //API Call with sparse fieldsets
  useEffect(() => {
    const API_ROOT = '/jsonapi/';
    const url = `${API_ROOT}node/faq?fields[node--faq]=id,drupal_internal__nid,title,field_answer&sort=created`;

    const headers = new Headers({
      Accept: 'application/vnd.api+json',
    });

    fetch(url, {headers})
      .then((response) => response.json())
      .then((data) => {
        if (isValidData(data)) {
          setContent(data.data)
        }
      })
      .catch(err => console.log('There was an error accessing the API', err));
  }, []);

  return (
    <div class="faq-results">
      {/* <h2>FAQ Search</h2> */}
      {content ? (
        <>
          <form class="faq-search-form">
            <label htmlFor="filter">Type to Filter:</label>
            <input 
              class='form-control'
              type='text'
              name='filter'
              placeholder='Start typing...'
              onChange={(event => setFilter(event.target.value.toLowerCase()))}
            />
          </form>
          {/* <hr/> */}
          {/* Add bootstrap classes to the filter */}
          <div class="accordion" id="accordionBlock">
            {
              content.filter((item) => {
                if (!filter) {
                  return item;
                }

                if (filter && (item.attributes.title.toLowerCase().includes(filter) || item.attributes.field_answer.processed.toLowerCase().includes(filter))) {
                  return item;
                }
              }).map((item) => <FaqItem key={item.id} {...item.attributes}/>)
            }
          </div>
        </>
      ) : (
          <NoData />
      )}
    </div>
  );
};

export default FaqList;