// keep track of form errors
let errors = 3;

// send contact us form
async function sendMessage() {

	const formData = new FormData();
	formData.set('email', $('#email').val());
	formData.set('subject', $('#subject').val());
	formData.set('message', $('#message').val());

	const response = await axios({
		method: 'post',
		url: './send.php',
		data: formData
	}).catch(error => {
		console.log(errors);
		return null;
	}).finally(() => {

	});

	console.log(response);

	// reset form
	errors = 3;
	$('input, textarea').val('');
	$('#send').addClass('disabled');

	// alert form was sent successfully
	$('.page.contact').prepend(`
	<div class="alert alert-success" role="alert"><div>Sent!</div></div>
	`);
	setTimeout(function(){
		$('.alert-success').remove();
	}, 3000);
}

// highlight current page on navbar and show/hide pages
function activateLink(id) {
	$('.nav-link').removeClass('active');
	$('.page').removeClass('active');
	$(`.${id}`).addClass('active');
}

$(document).ready(function() {
	// populate home/products page
	async function popProducts(url) {
		const response = await axios.get(url);

		console.log(response);

		response.data.forEach((p, i) => {
			$('#products').append(`
			<!--product card-->
			<div class="col-md-4 px-1"><div class="card h-100">
			<div class="product-img">
			<img src="./images/${p.image_main}" alt="Main image" class="card-img-top">
			<div class="price">$${p.price}</div>
			</div>
			<div class="card-body d-flex flex-column">
			<h5 class="card-title">${p.title}</h5>
			<p class="card-text">${p.description}</p>
			<button class="btn btn-primary w-100 mt-auto" data-bs-toggle="modal" data-bs-target="#modal-${i}">View</button>
			</div>
			</div></div>

			<!--product modal-->
			<div class="modal fade" id="modal-${i}">
			<div class="modal-dialog"><div class="modal-content">
			<div class="modal-header">
			<h5 class="modal-title">${p.title}</h5>
			<button class="btn-close" type="button" data-bs-dismiss="modal"></button>
			</div>
			<div class="modal-body">
			<p>${p.description}</p>
			<img class="w-100 mb-3" src="./images/${p.image_large}" alt="Large image"></img>
			<div class="row mb-3 g-1">
			<a class="col-md-3" href="./images/${p.image_gallery_1}" data-fancybox="gallery-${i}"><img class="w-100" src="./images/${p.image_gallery_1}" alt="Gallery image 1"></img></a>
			<a class="col-md-3" href="./images/${p.image_gallery_2}" data-fancybox="gallery-${i}"><img class="w-100" src="./images/${p.image_gallery_2}" alt="Gallery image 2"></img></a>
			<a class="col-md-3" href="./images/${p.image_gallery_3}" data-fancybox="gallery-${i}"><img class="w-100" src="./images/${p.image_gallery_3}" alt="Gallery image 3"></img></a>
			<a class="col-md-3" href="./images/${p.image_gallery_4}" data-fancybox="gallery-${i}"><img class="w-100" src="./images/${p.image_gallery_4}" alt="Gallery image 4"></img></a>
			<a class="col-md-3" href="./images/${p.image_gallery_5}" data-fancybox="gallery-${i}"><img class="w-100" src="./images/${p.image_gallery_5}" alt="Gallery image 5"></img></a>
			<a class="col-md-3" href="./images/${p.image_gallery_6}" data-fancybox="gallery-${i}"><img class="w-100" src="./images/${p.image_gallery_6}" alt="Gallery image 6"></img></a>
			</div>
			</div>
			<div class="modal-footer">
			<button class="btn btn-success w-100" type="button">Add to cart</button>
			<button class="btn btn-secondary w-100" type="button" data-bs-dismiss="modal">Close</button>
			</div>
			</div></div>
			</div>
			`);

			// fancyboxes
			Fancybox.bind(`[data-fancybox="gallery-${i}"]`);
		});
	}

	// call populate products func
	popProducts('https://codethesolution.com/nscc/project2700-andre.php');

	// jCarousel
	$('.jcarousel').jcarousel();
	// auto-scroll
	const autoScroll = setInterval(function() {
		$('.jcarousel').jcarousel('scroll', '+=1', true, function(scrolled) {
			if (!scrolled) $('.jcarousel').jcarousel('scroll', 0);
		});
	}, 5000);
	// prev control
	$('.jcarousel-control-prev').click(function() {
		$('.jcarousel').jcarousel('scroll', '-=1', true, function(scrolled) {
			if (!scrolled) $('.jcarousel').jcarousel('scroll', $('.jcarousel').jcarousel('last'));
		});
	});
	// next control
	$('.jcarousel-control-next').click(function() {
		$('.jcarousel').jcarousel('scroll', '+=1', true, function(scrolled) {
			if (!scrolled) $('.jcarousel').jcarousel('scroll', 0);
		});
	});

	// prevent return from submitting form
	$('input').keydown(function(e) {
		if (e.key === 'Enter') e.preventDefault();
	});

	// check fields
	function toggleError(elem, isError = true) {
		if (isError) {
			$(elem).addClass('error');
			$(elem).siblings('small').removeClass('d-none');
			$('#send').addClass('disabled');
			if ($('.page.contact .alert').length === 0) $('.page.contact').prepend(`
				<div class="alert alert-danger" role="alert"><div>Please review the form for errors</div></div>
				`);

		} else {
			$(elem).removeClass('error');
			$(elem).siblings('small').addClass('d-none');
			if (errors === 0) {
				$('#send').removeClass('disabled');
				$('.alert-danger').remove();
			}
		}
	}

	$('input, textarea').on({
		input: function() {
			const l = $(this).val().length;

			if (l === 1) {
				errors = Math.max(0, errors -1);
				toggleError(this, false);

			} else if (l === 0) {
				errors = Math.min(3, errors +1);
				toggleError(this);
			}
		},
		blur: function() {
			if ($(this).val().length === 0) toggleError(this);
		},
		change: function() {
			const l = $(this).val().length;
			if (l > 0) {
				errors = Math.max(0, errors -1);
				toggleError(this, false);
			}
		}
	});
});
